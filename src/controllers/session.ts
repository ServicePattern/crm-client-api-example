import {setupHoverEffect} from '../helpers'
import type {AgentDesktopClientAPI, LoginData} from '../brightpattern-client-api-types'

const urlParams = new URLSearchParams(location.search)
const commWidgetVersion = urlParams.get('version') || '1.0'

export function initializeSessionHandlers(adApi: AgentDesktopClientAPI) {

    console.log(`initializeSessionHandlers: adApi`)

    let savedLoginData: LoginData | undefined
    adApi.on('ON_SERVER_ERROR', error => {
        console.log(`ON_SERVER_ERROR: error=`, error)
        if (error.code === 108 && savedLoginData) { // 108= 'user_already_logged_in'
            adApi.login(savedLoginData, true)
        }
        savedLoginData = undefined
    });

    adApi.on('ON_LOGIN', loginState => {
        console.log(`ON_LOGIN: loginState=`, loginState)
        savedLoginData = undefined
    });

    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ AAHHA')

    const tenantInput = document.getElementById('tenant_input') as HTMLInputElement | null
    const usernameInput = document.getElementById('username_input') as HTMLInputElement | null
    const passwordInput = document.getElementById('password_input') as HTMLInputElement | null

    const loginButton = document.getElementById('login_button')!
    const logoutButton = document.getElementById('logout_button')!
    const getLoginStateButton = document.getElementById('get_login_state_button')!

    if (commWidgetVersion !== '1.0') {
        document.getElementById('login_inputs')?.remove()
        loginButton.textContent = 'Open Login'
    }

    setupHoverEffect(getLoginStateButton, [])
    getLoginStateButton.onclick = () => {
        adApi.getLoginState()
    }

    setupHoverEffect(loginButton, commWidgetVersion === '1.0' ? [tenantInput!, usernameInput!, passwordInput!] : [])
    loginButton.onclick = () => {
        if (commWidgetVersion === '1.0') {
            const username = usernameInput!.value
            const password = passwordInput!.value
            const tenant = tenantInput!.value

            const loginData: LoginData = {username, password, tenant}
            savedLoginData = loginData
            adApi.login(loginData)
        } else {
            adApi.openLogin()
        }
    }

    setupHoverEffect(logoutButton, [])
    logoutButton.onclick = () => {
        adApi.logout()
    }
}
