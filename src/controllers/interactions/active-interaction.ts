import {setupHoverEffect} from "../../helpers";
import {AgentDesktopClientAPI} from "../../brightpattern-client-api-types";

export function initializeActiveInteractionHandlers(adApi: AgentDesktopClientAPI) {
    const activeInteractionIdInput = document.getElementById('active_interaction_id_input')! as HTMLInputElement
    const dtmfInput = document.getElementById('dtmf_input')! as HTMLInputElement
    const variableNameInput = document.getElementById('variable_name_input')! as HTMLInputElement
    const variableValueInput = document.getElementById('variable_value_input')! as HTMLInputElement

    const setVariableButton = document.getElementById('set_variable_button')!
    const switchActiveInteractionButton = document.getElementById('switch_active_interaction_button')!
    const acceptInteractionButton = document.getElementById('accept_interaction_button')!
    const rejectInteractionButton = document.getElementById('reject_interaction_button')!
    const sendDtmfButton = document.getElementById('send_dtmf_button')!

    const setCallHoldButton = document.getElementById('set_call_hold_button')!
    const callHoldCheckbox = document.getElementById('call_hold_checkbox')! as HTMLInputElement
    const setCallRecordingButton = document.getElementById('set_call_recording_button')!
    const callRecordingCheckbox = document.getElementById('call_recording_checkbox')! as HTMLInputElement
    const setCallMuteButton = document.getElementById('set_call_mute_button')!
    const callMuteCheckbox = document.getElementById('call_mute_checkbox')! as HTMLInputElement


    setupHoverEffect(switchActiveInteractionButton, [activeInteractionIdInput])
    switchActiveInteractionButton.onclick = () => {
        const itemId = activeInteractionIdInput.value
        adApi.switchActiveInteraction(itemId)
    }


    setupHoverEffect(switchActiveInteractionButton, [activeInteractionIdInput])
    switchActiveInteractionButton.onclick = () => {
        const itemId = activeInteractionIdInput.value
        adApi.switchActiveInteraction(itemId)
    }

    setupHoverEffect(acceptInteractionButton, [activeInteractionIdInput])
    acceptInteractionButton.onclick = () => {
        const itemId = activeInteractionIdInput.value
        adApi.acceptInteraction(itemId)
    }

    setupHoverEffect(rejectInteractionButton, [activeInteractionIdInput])
    rejectInteractionButton.onclick = () => {
        const itemId = activeInteractionIdInput.value
        adApi.rejectInteraction(itemId)
    }

    setupHoverEffect(sendDtmfButton, [dtmfInput, activeInteractionIdInput])
    sendDtmfButton.onclick = () => {
        const dtmf = dtmfInput.value
        const itemId = activeInteractionIdInput.value
        adApi.sendDtmf(dtmf, itemId)
    }


setupHoverEffect(setCallHoldButton, [callHoldCheckbox, activeInteractionIdInput])
setCallHoldButton.onclick = () => {
    const holdCall = callHoldCheckbox.checked
    const itemId = activeInteractionIdInput.value
    adApi.setCallHold(holdCall, itemId)
}
callHoldCheckbox.addEventListener('change', (evt) =>{
    const holdCall = (evt.target as HTMLInputElement).checked
    setCallHoldButton.innerHTML = `setCallHold (${holdCall ? 'hold' : 'retrieve'})`
})

setupHoverEffect(setCallRecordingButton, [callRecordingCheckbox, activeInteractionIdInput])
setCallRecordingButton.onclick = () => {
    const callRecording = callRecordingCheckbox.checked
    const itemId = activeInteractionIdInput.value
    adApi.setCallRecording(callRecording, itemId)
}
callRecordingCheckbox.addEventListener('change', (evt) =>{
    const callRecording = (evt.target as HTMLInputElement).checked
    setCallRecordingButton.innerHTML = `setCallRecording (${callRecording ? 'start' : 'stop'})`
})

setupHoverEffect(setCallMuteButton, [callMuteCheckbox, activeInteractionIdInput])
setCallMuteButton.onclick = () => {
    const muteCall = callMuteCheckbox.checked
    const itemId = activeInteractionIdInput.value
    adApi.setCallMute(muteCall, itemId)
}
callMuteCheckbox.addEventListener('change', (evt) =>{
    const muteCall = (evt.target as HTMLInputElement).checked
    setCallMuteButton.innerHTML = `setCallMute (${muteCall ? 'mute' : 'unmute'})`
})


setupHoverEffect(setVariableButton, [variableNameInput, variableValueInput, activeInteractionIdInput])
setVariableButton.onclick = () => {
    const variableName = variableNameInput.value
    const variableValue = variableValueInput.value
    const itemId = activeInteractionIdInput.value
    adApi.setVariable(variableName, variableValue, itemId)
}
}