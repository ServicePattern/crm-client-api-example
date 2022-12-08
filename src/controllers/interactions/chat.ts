import {setupHoverEffect} from "../../helpers";
import {AgentDesktopClientAPI} from "../../brightpattern-client-api-types";

export function initializeChatHandlers(adApi: AgentDesktopClientAPI) {

    const chatInteractionIdInput = document.getElementById('chat_interaction_id_input')! as HTMLInputElement
    const chatMessageInput = document.getElementById('chat_message_input')! as HTMLInputElement
    const overwriteMessageCheckbox = document.getElementById('chat_message_overwrite_checkbox')! as HTMLInputElement

    const sendChatMessageButton = document.getElementById('send_chat_message_button')!
    const suggestChatMessageButton = document.getElementById('suggest_chat_message_button')!

    setupHoverEffect(sendChatMessageButton, [chatMessageInput, chatInteractionIdInput])
    sendChatMessageButton.onclick = () => {
        const chatMessage = chatMessageInput.value
        const chatItemId = chatInteractionIdInput.value
        adApi.sendChatMessage(chatMessage, chatItemId)
    }


    setupHoverEffect(suggestChatMessageButton, [chatMessageInput, overwriteMessageCheckbox, chatInteractionIdInput])
    suggestChatMessageButton.onclick = () => {
        const chatMessage = chatMessageInput.value
        const overwriteMessage = overwriteMessageCheckbox.checked
        const chatItemId = chatInteractionIdInput.value
        adApi.suggestChatMessage(chatMessage, overwriteMessage, chatItemId)
    }

}