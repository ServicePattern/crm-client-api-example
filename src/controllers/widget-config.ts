import {AgentDesktopClientAPI} from "../brightpattern-client-api-types";
import {setupHoverEffect} from "../helpers";

export function initializeWidgetAndConfigHandlers(adApi: AgentDesktopClientAPI) {
    const getConfigButton = document.getElementById('get_config_button')!
    const setWidgetMinimizedButton = document.getElementById('set_widget_minimized_button')!
    const widgetMinimizedCheckbox = document.getElementById('widget_minimized_checkbox')! as HTMLInputElement

    setupHoverEffect(getConfigButton, [])
    getConfigButton.onclick = () => {
        adApi.getConfig()
    }

    setupHoverEffect(setWidgetMinimizedButton, [widgetMinimizedCheckbox])
    setWidgetMinimizedButton.onclick = () => {
        const widgetMinimized = widgetMinimizedCheckbox.checked
        adApi.setWidgetMinimized(widgetMinimized)
    }

}