import {setupHoverEffect} from "../helpers";
import {AgentDesktopClientAPI} from "../brightpattern-client-api-types";

export function initializeSessionHandlers(adApi: AgentDesktopClientAPI) {
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

        adApi.login({username: username, password: password, tenant: tenant})
    }

    setupHoverEffect(logoutButton, [])
    logoutButton.onclick = () => {
        adApi.logout()
    }
}

