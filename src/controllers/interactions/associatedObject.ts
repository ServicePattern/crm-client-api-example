import {setupHoverEffect} from "../../helpers";
import {InteractionAssociatedObject, AgentDesktopClientAPI} from "../../brightpattern-client-api-types";

export function initializeAssociatedObjectInteractionHandlers(adApi: AgentDesktopClientAPI) {
    const activeAssociatedInteractionIdInput = document.getElementById('active-associated_interaction_id_input')! as HTMLInputElement

    const activeScreenTextarea = document.getElementById('active_screen_textarea')! as HTMLTextAreaElement
    const activeAssociatedObjectTextarea = document.getElementById('active-associated_object_textarea')! as HTMLTextAreaElement

    const setInteractionActiveScreenButton = document.getElementById('set_interaction_active_screen_button')!
    const addInteractionAssociatedObjectButton = document.getElementById('add_interaction_associated_object_button')!

    setupHoverEffect(addInteractionAssociatedObjectButton, [activeAssociatedObjectTextarea, activeAssociatedInteractionIdInput])
    addInteractionAssociatedObjectButton.onclick = () => {
        let associatedObject: InteractionAssociatedObject | null = null
        try {
            associatedObject = JSON.parse(activeAssociatedObjectTextarea.value)
        } catch (e) {
            alert('You have syntax error in the associated object structure. Cannot parse JSON.')
        }
        if (!associatedObject) {
            return
        }
        const itemId = activeAssociatedInteractionIdInput.value
        adApi.addInteractionAssociatedObject(associatedObject, itemId)
    }


    setupHoverEffect(setInteractionActiveScreenButton, [activeScreenTextarea, activeAssociatedInteractionIdInput])
    setInteractionActiveScreenButton.onclick = () => {
        let activeScreenData: any | null = null
        try {
            activeScreenData = JSON.parse(activeScreenTextarea.value)
        } catch (e) {
            alert('You have syntax error in the active screen data structure. Cannot parse JSON.')
        }
        if (!activeScreenData) {
            return
        }
        const itemId = activeAssociatedInteractionIdInput.value
        adApi.setInteractionActiveScreen(activeScreenData, itemId)
    }
}