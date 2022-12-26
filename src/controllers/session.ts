import {setupHoverEffect} from "../helpers";
import {AgentDesktopClientAPI, LoginData} from "../brightpattern-client-api-types";

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

    const tenantInput = document.getElementById('tenant_input')! as HTMLInputElement
    const usernameInput = document.getElementById('username_input')! as HTMLInputElement
    const passwordInput = document.getElementById('password_input')! as HTMLInputElement

    const loginButton = document.getElementById('login_button')!
    const logoutButton = document.getElementById('logout_button')!
    const getLoginStateButton = document.getElementById('get_login_state_button')!


    setupHoverEffect(getLoginStateButton, [])
    getLoginStateButton.onclick = () => {
        adApi.getLoginState()
    }

    setupHoverEffect(loginButton, [usernameInput, passwordInput, tenantInput])
    loginButton.onclick = () => {
        const username = usernameInput.value
        const password = passwordInput.value
        const tenant = tenantInput.value
        console.table()

        const loginData: LoginData = {username, password, tenant}
        savedLoginData = loginData
        adApi.login(loginData)
    }

    setupHoverEffect(logoutButton, [])
    logoutButton.onclick = () => {
        adApi.logout()
    }
}
