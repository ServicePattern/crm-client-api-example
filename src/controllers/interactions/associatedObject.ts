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


    const btnPasteServiceNowContactObject = document.getElementById('active_associated_object_paste_service_now_contact_object')!
    const btnPasteServiceNowTaskObject = document.getElementById('active_associated_object_paste_service_now_task_object')!
    const btnPasteSalesforceCaseObject = document.getElementById('active_associated_object_paste_salesforce_case_object')!
    const btnPasteSalesforceContactObject = document.getElementById('active_associated_object_paste_salesforce_contact_object')!

    btnPasteServiceNowContactObject.addEventListener('click', pasteServiceNowContactObject)
    btnPasteServiceNowTaskObject.addEventListener('click', pasteServiceNowTaskObject)
    btnPasteSalesforceCaseObject.addEventListener('click', pasteSalesforceCaseObject)
    btnPasteSalesforceContactObject.addEventListener('click', pasteSalesforceContactObject)

    function pasteServiceNowContactObject() {
        activeAssociatedObjectTextarea.value = JSON.stringify({
            "id": "1",
            "type": "contact",
            "displayName": "Pavel Karpovich",
            "displayType": "Contact",
            "customFields": {
                "isServiceNowContact": "true"
            }
        }, null, 4)
    }

    function pasteServiceNowTaskObject() {
        activeAssociatedObjectTextarea.value = JSON.stringify({
            "id": "2",
            "type": "task",
            "displayName": "TD-101",
            "displayType": "Task",
            "customFields": {
                "isServiceNowTask": "true"
            }
        }, null, 4)
    }
    function pasteSalesforceCaseObject() {
        activeAssociatedObjectTextarea.value = JSON.stringify({
            "id": "3",
            "type": "case",
            "displayName": "CS-404",
            "displayType": "Case",
            "customFields": {
                "isCase": "true"
            }
        }, null, 4)
    }
    function pasteSalesforceContactObject() {
        activeAssociatedObjectTextarea.value = JSON.stringify({
            "id": "4",
            "type": "contact",
            "displayName": "Nikolai Maslak",
            "displayType": "Contact",
            "customFields": {
                "isContact": "true"
            }
        }, null, 4)
    }
}