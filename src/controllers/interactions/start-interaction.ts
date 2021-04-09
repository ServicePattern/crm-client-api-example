import {AgentDesktopClientAPI, InteractionAssociatedObject} from "../../brightpattern-client-api-types";
import {setupHoverEffect} from "../../helpers";

export function initializeStartInteractionHandlers(adApi: AgentDesktopClientAPI) {
    const startCallPhoneNumberInput = document.getElementById('start_call_phone_number_input')! as HTMLInputElement
    const chatChannelInput = document.getElementById('chat_channel_input')! as HTMLInputElement
    const emailAddressInput = document.getElementById('email_address_input')! as HTMLInputElement
    const chatAddressInput = document.getElementById('chat_address_input')! as HTMLInputElement

    const associatedObjectTextarea = document.getElementById('associated_object_textarea')! as HTMLTextAreaElement

    const startChatButton = document.getElementById('start_chat_button')!
    const startEmailButton = document.getElementById('start_email_button')!
    const startCallButton = document.getElementById('start_call_button')!

    setupHoverEffect(startCallButton, [startCallPhoneNumberInput, associatedObjectTextarea])
    startCallButton.onclick = () => {
        const phone = startCallPhoneNumberInput.value
        let associatedObject: InteractionAssociatedObject | undefined = undefined
        const associatedObjectStr = associatedObjectTextarea.value
        if (associatedObjectStr) {
            try {
                associatedObject = JSON.parse(associatedObjectStr)
            } catch (e) {
                alert('You have syntax error in the associated object structure. Cannot parse JSON.')
                return
            }
        }
        adApi.startCall(phone, associatedObject)
    }

    setupHoverEffect(startChatButton, [chatChannelInput, chatAddressInput, associatedObjectTextarea])
    startChatButton.onclick = () => {
        const chatChannel = chatChannelInput.value
        const chatAddress = chatAddressInput.value
        let associatedObject: InteractionAssociatedObject | undefined = undefined
        const associatedObjectStr = associatedObjectTextarea.value
        if (associatedObjectStr) {
            try {
                associatedObject = JSON.parse(associatedObjectStr)
            } catch (e) {
                alert('You have syntax error in the associated object structure. Cannot parse JSON.')
                return
            }
        }
        adApi.startChat(chatChannel as any, chatAddress, associatedObject)
    }

    setupHoverEffect(startEmailButton, [emailAddressInput, associatedObjectTextarea])
    startEmailButton.onclick = () => {
        const emailAddress = emailAddressInput.value
        let associatedObject: InteractionAssociatedObject | undefined = undefined
        const associatedObjectStr = associatedObjectTextarea.value
        if (associatedObjectStr) {
            try {
                associatedObject = JSON.parse(associatedObjectStr)
            } catch (e) {
                alert('You have syntax error in the associated object structure. Cannot parse JSON.')
                return
            }
        }
        adApi.startEmail(emailAddress, associatedObject)
    }

}