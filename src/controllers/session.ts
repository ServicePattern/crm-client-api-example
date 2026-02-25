import {setupHoverEffect} from '../helpers'
import type {AgentDesktopClientAPI} from '../brightpattern-client-api-types'

export function initializeSessionHandlers(adApi: AgentDesktopClientAPI) {

    console.log(`initializeSessionHandlers: adApi`)

    adApi.on('ON_LOGIN', loginState => {
        console.log(`ON_LOGIN: loginState=`, loginState)
    });

    const loginButton = document.getElementById('login_button')!
    const logoutButton = document.getElementById('logout_button')!
    const getLoginStateButton = document.getElementById('get_login_state_button')!

    setupHoverEffect(getLoginStateButton, [])
    getLoginStateButton.onclick = () => {
        adApi.getLoginState()
    }

    setupHoverEffect(loginButton, [])
    loginButton.onclick = () => {
        adApi.openLogin()
    }

    setupHoverEffect(logoutButton, [])
    logoutButton.onclick = () => {
        adApi.logout()
    }
}
