// need to use `import type` when using local copy of .d.ts for brightpattern API types
import type {InteractionAssociatedObject} from './brightpattern-client-api-types'
import {Hamburger} from './components/hamburger'

import './app.css'
import {Menu} from './components/menu'
import {Tab} from './components/tab'

const integrationKey = 'test-adapter'

const hamburger = new Hamburger('.hamburger', '.menu')
hamburger.initializeEventListener()

const menu = new Menu(hamburger, '.menu', '.menu-item', '.section')
menu.initializeEventListeners()

const tab = new Tab('.tab', '.tab-item', '.tab-content')
tab.initializeEventListeners()

const messageClass = {
    'o': 'outgoing',
    'ir': 'incoming-result',
    'i': 'incoming',
    'or': 'outgoing-result',
    'e': 'error',
}

const logs = document.getElementById('log')!
const adcMountNode = document.getElementById('adc_mount_node')!

const clearLogButton = document.getElementById('clear_log')!
clearLogButton.onclick = () => {
    logs.innerText = ''
}

const getLoginStateButton = document.getElementById('get_login_state_button')!
const loginButton = document.getElementById('login_button')!
const usernameInput = document.getElementById('username_input')! as HTMLInputElement
const passwordInput = document.getElementById('password_input')! as HTMLInputElement
const tenantInput = document.getElementById('tenant_input')! as HTMLInputElement
const logoutButton = document.getElementById('logout_button')!

const getPhoneDevicesListButton = document.getElementById('get_phone_devices_list_button')!
const getPhoneDeviceButton = document.getElementById('get_phone_device_button')!
const phoneDeviceTypeInput = document.getElementById('phone_device_type_input')! as HTMLInputElement
const phoneDeviceNumberInput = document.getElementById('phone_device_number_input')! as HTMLInputElement
const setPhoneDeviceButton = document.getElementById('set_phone_device_button')!

const getAgentStateButton = document.getElementById('get_agent_state_button')!
const setAgentStateButton = document.getElementById('set_agent_state_button')!
const agentStateInput = document.getElementById('agent_state_input')! as HTMLInputElement
const notReadyReasonInput = document.getElementById('not_ready_reason_input')! as HTMLInputElement

const startCallButton = document.getElementById('start_call_button')!

const startCallPhoneNumberInput = document.getElementById('start_call_phone_number_input')! as HTMLInputElement
const transferPhoneNumberInput = document.getElementById('transfer_phone_number_input')! as HTMLInputElement
const conferencePhoneNumberInput = document.getElementById('conference_phone_number_input')! as HTMLInputElement
const reschedulePhoneNumberInput = document.getElementById('reschedule_phone_number_input')! as HTMLInputElement
const startChatButton = document.getElementById('start_chat_button')!
const chatChannelInput = document.getElementById('chat_channel_input')! as HTMLInputElement
const chatAddressInput = document.getElementById('chat_address_input')! as HTMLInputElement
const startEmailButton = document.getElementById('start_email_button')!
const emailAddressInput = document.getElementById('email_address_input')! as HTMLInputElement

const consultCallButton = document.getElementById('consult_call_button')!
const blindTransferButton = document.getElementById('blind_transfer_button')!
const transferButton = document.getElementById('transfer_button')!
const mainItemIdInput = document.getElementById('main_item_id_input')! as HTMLInputElement
const consultCallIdInput = document.getElementById('consult_call_id_input')! as HTMLInputElement

const interactionIdInput = document.getElementById('interaction_id_input')! as HTMLInputElement
const activeInteractionIdInput = document.getElementById('active_interaction_id_input')! as HTMLInputElement
const conferenceInteractionIdInput = document.getElementById('conference_interaction_id_input')! as HTMLInputElement
const notesInteractionIdInput = document.getElementById('notes_interaction_id_input')! as HTMLInputElement
const completeInteractionIdInput = document.getElementById('complete_interaction_id_input')! as HTMLInputElement
const rescheduleInteractionIdInput = document.getElementById('reschedule_interaction_id_input')! as HTMLInputElement
const leaveInteractionButton = document.getElementById('leave_interaction_button')!
const completeInteractionButton = document.getElementById('complete_interaction_button')!
const leaveAndCompleteInteractionButton = document.getElementById('leave_and_complete_interaction_button')!
const switchActiveInteractionButton = document.getElementById('switch_active_interaction_button')!

const acceptInteractionButton = document.getElementById('accept_interaction_button')!
const rejectInteractionButton = document.getElementById('reject_interaction_button')!
const sendDtmfButton = document.getElementById('send_dtmf_button')!
const dtmfInput = document.getElementById('dtmf_input')! as HTMLInputElement

const inviteToCallConferenceButton = document.getElementById('add_to_call_conference_button')!
const removeFromCallConferenceButton = document.getElementById('remove_from_call_conference_button')!
const partyIdInput = document.getElementById('party_id_input')! as HTMLInputElement
const destroyCallConferenceButton = document.getElementById('destroy_call_conference_button')!
const completeDestroyCallConferenceButton = document.getElementById('complete_destroy_call_conference_button')!

const getTeamsButton = document.getElementById('get_teams_button')!
const getTeamMembersButton = document.getElementById('get_team_members_button')!
const teamIdInput = document.getElementById('team_id_input')! as HTMLInputElement
const getServicesListButton = document.getElementById('get_services_list_button')!
const setServiceButton = document.getElementById('set_service_button')!
const serviceIdInput = document.getElementById('service_id_input')! as HTMLInputElement
const notesServiceIdInput = document.getElementById('notes_service_id_input')! as HTMLInputElement

const setRescheduleWindowButton = document.getElementById('set_reschedule_window_button')!
const fromTimeInput = document.getElementById('from_time_input')! as HTMLInputElement
const untilTimeInput = document.getElementById('until_time_input')! as HTMLInputElement
const timezoneCodeInput = document.getElementById('timezone_code_input')! as HTMLInputElement

const getDispositionsListButton = document.getElementById('get_dispositions_list_button')!
const setDispositionButton = document.getElementById('set_disposition_button')!
const dispositionIdInput = document.getElementById('disposition_id_input')! as HTMLInputElement
const completeDispositionIdInput = document.getElementById('complete_disposition_id_input')! as HTMLInputElement

const addNoteButton = document.getElementById('add_note_button')!
const updateNoteButton = document.getElementById('update_note_button')!
const replaceNoteButton = document.getElementById('replace_note_button')!
const noteInput = document.getElementById('note_input')! as HTMLInputElement
const completeNoteInput = document.getElementById('complete_note_input')! as HTMLInputElement

const setCallHoldButton = document.getElementById('set_call_hold_button')!
const callHoldCheckbox = document.getElementById('call_hold_checkbox')! as HTMLInputElement
const setCallRecordingButton = document.getElementById('set_call_recording_button')!
const callRecordingCheckbox = document.getElementById('call_recording_checkbox')! as HTMLInputElement
const setCallMuteButton = document.getElementById('set_call_mute_button')!
const callMuteCheckbox = document.getElementById('call_mute_checkbox')! as HTMLInputElement

const setScreenRecordingMuteButton = document.getElementById('set_screen_recording_mute_button')!
const screenRecordingMuteCheckbox = document.getElementById('screen_recording_mute_checkbox')! as HTMLInputElement
const getScreenRecordingStateButton = document.getElementById('get_screen_recording_state_button')!

const setVariableButton = document.getElementById('set_variable_button')!
const variableNameInput = document.getElementById('variable_name_input')! as HTMLInputElement
const variableValueInput = document.getElementById('variable_value_input')! as HTMLInputElement
const getConfigButton = document.getElementById('get_config_button')!
const setWidgetMinimizedButton = document.getElementById('set_widget_minimized_button')!
const widgetMinimizedCheckbox = document.getElementById('widget_minimized_checkbox')! as HTMLInputElement

const addInteractionAssociatedObjectButton = document.getElementById('add_interaction_associated_object_button')!
const associatedObjectTextarea = document.getElementById('associated_object_textarea')! as HTMLTextAreaElement

const setInteractionActiveScreenButton = document.getElementById('set_interaction_active_screen_button')!
const activeScreenTextarea = document.getElementById('active_screen_textarea')! as HTMLTextAreaElement

const transferDataTextarea = document.getElementById('transfer_data_textarea')! as HTMLTextAreaElement
const conferenceTransferDataTextarea = document.getElementById('conference_transfer_data_textarea')! as HTMLTextAreaElement
const searchKBResultTextarea = document.getElementById('search_kb_result_textarea')! as HTMLTextAreaElement
const kbArticleFullDataTextarea = document.getElementById('kb_article_full_data_textarea')! as HTMLTextAreaElement

const resetSizeButton = document.querySelector('.reset_size_button') as HTMLElement
const mainSection = document.querySelector('.main-section') as HTMLElement


const adApi = new window.brightpattern.AdApi({
    integrationKey,
    mountRoot: adcMountNode,
    standalone: !!(new URLSearchParams(location.search)).get('standalone'),
})

const setupHoverEffect = (hoverElement: Element, highlightElements: Element[]) => {
    hoverElement.addEventListener('mouseenter', () => {
        highlightElements.forEach(element => {
            element.classList.add('highlighted')
        })
    })
    hoverElement.addEventListener('mouseleave', () => {
        highlightElements.forEach(element => {
            element.classList.remove('highlighted')
        })
    })
}

const log = (type: keyof typeof messageClass, message: string, content: string) => {
    const msgDiv = document.createElement('div')
    const typeContainerDiv = document.createElement('div')
    const typeDiv = document.createElement('div')
    const dataDiv = document.createElement('div')

    msgDiv.classList.add('log-msg')
    msgDiv.classList.add(messageClass[type])
    typeDiv.textContent = message
    dataDiv.textContent = content

    typeContainerDiv.appendChild(typeDiv)
    msgDiv.appendChild(typeContainerDiv)
    msgDiv.appendChild(dataDiv)

    const isScrolledToBottom = logs.scrollHeight - logs.clientHeight <= logs.scrollTop + 1
    logs.appendChild(msgDiv)
    if (isScrolledToBottom) {
        logs.scrollTop = logs.scrollHeight - logs.clientHeight
    }
}

adApi.injectMessageLogger((message, data) => {
    if (message.startsWith('ON_')) {
        if (message.endsWith('_RESPONSE')) {
            log('or', message, data ? JSON.stringify(data) : '')
        } else {
            log('i', message, data ? JSON.stringify(data) : '')
        }
    } else {
        if (message.endsWith('_RESPONSE')) {
            log(data.status === 'success' ? 'ir' : 'e', message, JSON.stringify(data))
        } else {
            log('o', message, data ? JSON.stringify(data) : '')
        }
    }
})

resetSizeButton.addEventListener('click', resetMainSectionSize)

function resetMainSectionSize() {
    mainSection.removeAttribute('style')
}

setupHoverEffect(getLoginStateButton, [])
getLoginStateButton.onclick = () => {
    adApi.getLoginState()
}

setupHoverEffect(loginButton, [usernameInput, passwordInput, tenantInput])
loginButton.onclick = () => {
    const username = usernameInput.value
    const password = passwordInput.value
    const tenant = tenantInput.value
    adApi.login(username, password, tenant)
}

setupHoverEffect(logoutButton, [])
logoutButton.onclick = () => {
    adApi.logout()
}

setupHoverEffect(getPhoneDevicesListButton, [])
getPhoneDevicesListButton.onclick = () => {
    adApi.getPhoneDevicesList()
}

setupHoverEffect(getPhoneDeviceButton, [])
getPhoneDeviceButton.onclick = () => {
    adApi.getPhoneDevice()
}

setupHoverEffect(setPhoneDeviceButton, [phoneDeviceTypeInput, phoneDeviceNumberInput])
setPhoneDeviceButton.onclick = () => {
    adApi.setPhoneDevice({
        type: phoneDeviceTypeInput.value as any,
        phone: phoneDeviceNumberInput.value,
    })
}

setupHoverEffect(getAgentStateButton, [])
getAgentStateButton.onclick = () => {
    adApi.getAgentState()
}

setupHoverEffect(setAgentStateButton, [agentStateInput, notReadyReasonInput])
setAgentStateButton.onclick = () => {
    const state = agentStateInput.value
    const notReadyReason = notReadyReasonInput.value
    adApi.setAgentState(state as any, notReadyReason)
}

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

setupHoverEffect(consultCallButton, [transferPhoneNumberInput])
consultCallButton.onclick = () => {
    const phoneNumber = transferPhoneNumberInput.value
    adApi.consultCall(phoneNumber)
}

setupHoverEffect(blindTransferButton, [transferPhoneNumberInput, interactionIdInput, transferDataTextarea])
blindTransferButton.onclick = () => {
    const phoneNumber = transferPhoneNumberInput.value
    const itemId = interactionIdInput.value
    let transferData: any | null = null
    try {
        transferData = JSON.parse(transferDataTextarea.value)
    } catch (e) {
        alert('You have syntax error in the transfer data structure. Cannot parse JSON.')
    }
    adApi.blindTransfer(phoneNumber, transferData, itemId)
}

setupHoverEffect(transferButton, [mainItemIdInput, consultCallIdInput, transferDataTextarea])
transferButton.onclick = () => {
    const mainItemId = mainItemIdInput.value
    const consultCallId = consultCallIdInput.value
    let transferData: any | null = null
    try {
        transferData = JSON.parse(transferDataTextarea.value)
    } catch (e) {
        alert('You have syntax error in the transfer data structure. Cannot parse JSON.')
    }
    adApi.transfer(transferData, mainItemId, consultCallId)
}

setupHoverEffect(leaveInteractionButton, [completeInteractionIdInput])
leaveInteractionButton.onclick = () => {
    const itemId = completeInteractionIdInput.value
    adApi.leaveInteraction(itemId)
}

setupHoverEffect(completeInteractionButton, [completeInteractionIdInput])
completeInteractionButton.onclick = () => {
    const itemId = completeInteractionIdInput.value
    adApi.completeInteraction(itemId)
}

setupHoverEffect(leaveAndCompleteInteractionButton, [completeDispositionIdInput, completeNoteInput, completeInteractionIdInput])
leaveAndCompleteInteractionButton.onclick = () => {
    const dispositionId = completeDispositionIdInput.value
    const note = completeNoteInput.value
    const itemId = completeInteractionIdInput.value
    adApi.leaveAndCompleteInteraction(dispositionId, note, itemId)
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


setupHoverEffect(inviteToCallConferenceButton, [conferencePhoneNumberInput, conferenceTransferDataTextarea, conferenceInteractionIdInput])
inviteToCallConferenceButton.onclick = () => {
    const phoneNumber = conferencePhoneNumberInput.value
    let transferData: any | null = null
    try {
        transferData = JSON.parse(conferenceTransferDataTextarea.value)
    } catch (e) {
        alert('You have syntax error in the transfer data structure. Cannot parse JSON.')
    }
    const itemId = conferenceInteractionIdInput.value
    adApi.inviteToCallConference(phoneNumber, transferData, itemId)
}


setupHoverEffect(removeFromCallConferenceButton, [partyIdInput, conferenceInteractionIdInput])
removeFromCallConferenceButton.onclick = () => {
    const partyId = partyIdInput.value
    const itemId = conferenceInteractionIdInput.value
    adApi.removeFromCallConference(partyId, itemId)
}

setupHoverEffect(destroyCallConferenceButton, [conferenceInteractionIdInput])
destroyCallConferenceButton.onclick = () => {
    const itemId = conferenceInteractionIdInput.value
    adApi.destroyCallConference(itemId)
}

setupHoverEffect(completeDestroyCallConferenceButton, [completeInteractionIdInput])
completeDestroyCallConferenceButton.onclick = () => {
    const itemId = completeInteractionIdInput.value
    adApi.destroyCallConference(itemId)
}

setupHoverEffect(getTeamsButton, [])
getTeamsButton.onclick = () => {
    adApi.getTeams()
}

setupHoverEffect(getTeamMembersButton, [teamIdInput])
getTeamMembersButton.onclick = () => {
    const teamId = teamIdInput.value
    adApi.getTeamMembers(teamId)
}

setupHoverEffect(getServicesListButton, [])
getServicesListButton.onclick = () => {
    adApi.getServicesList()
}

setupHoverEffect(setServiceButton, [serviceIdInput])
setServiceButton.onclick = () => {
    const serviceId = serviceIdInput.value
    adApi.setService(serviceId)
}

setupHoverEffect(getDispositionsListButton, [notesServiceIdInput, notesInteractionIdInput])
getDispositionsListButton.onclick = () => {
    const serviceId = notesServiceIdInput.value
    const itemId = notesInteractionIdInput.value
    adApi.getDispositionsList({
        service: serviceId,
        interactionId: itemId,
    })
}

setupHoverEffect(setDispositionButton, [dispositionIdInput, notesInteractionIdInput])
setDispositionButton.onclick = () => {
    const dispositionId = dispositionIdInput.value
    const itemId = notesInteractionIdInput.value
    adApi.setDisposition(dispositionId, itemId)
}

setupHoverEffect(setRescheduleWindowButton, [reschedulePhoneNumberInput, rescheduleInteractionIdInput, fromTimeInput, untilTimeInput, timezoneCodeInput])
setRescheduleWindowButton.onclick = () => {
    const phoneNumber = reschedulePhoneNumberInput.value
    const itemId = rescheduleInteractionIdInput.value
    const fromTime = fromTimeInput.value
    const untilTime = untilTimeInput.value
    const timezoneCode = timezoneCodeInput.value
    adApi.setRescheduleWindow({numberToDial: phoneNumber, fromTime, untilTime, timezoneCode}, itemId)
}


setupHoverEffect(addNoteButton, [noteInput, notesInteractionIdInput])
addNoteButton.onclick = () => {
    const note = noteInput.value
    const itemId = notesInteractionIdInput.value
    adApi.addNote(note, itemId)
}

setupHoverEffect(updateNoteButton, [noteInput, notesInteractionIdInput])
updateNoteButton.onclick = () => {
    const note = noteInput.value
    const itemId = notesInteractionIdInput.value
    adApi.updateNote(note, itemId)
}

setupHoverEffect(replaceNoteButton, [noteInput, notesInteractionIdInput])
replaceNoteButton.onclick = () => {
    const note = noteInput.value
    const itemId = notesInteractionIdInput.value
    adApi.replaceNote(note, itemId)
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

setupHoverEffect(setScreenRecordingMuteButton, [screenRecordingMuteCheckbox])
setScreenRecordingMuteButton.onclick = () => {
    const muteScreenRecording = screenRecordingMuteCheckbox.checked
    adApi.setScreenRecordingMute(muteScreenRecording)
}
screenRecordingMuteCheckbox.addEventListener('change', (evt) =>{
    const screenRecordingMute = (evt.target as HTMLInputElement).checked
    setScreenRecordingMuteButton.innerHTML = `setScreenRecordingMute (${screenRecordingMute ? 'mute' : 'unmute'})`
})

setupHoverEffect(getScreenRecordingStateButton, [])
getScreenRecordingStateButton.onclick = () => {
    adApi.getScreenRecordingState()
}

setupHoverEffect(setVariableButton, [variableNameInput, variableValueInput, interactionIdInput])
setVariableButton.onclick = () => {
    const variableName = variableNameInput.value
    const variableValue = variableValueInput.value
    const itemId = interactionIdInput.value
    adApi.setVariable(variableName, variableValue, itemId)
}

setupHoverEffect(getConfigButton, [])
getConfigButton.onclick = () => {
    adApi.getConfig()
}

setupHoverEffect(setWidgetMinimizedButton, [widgetMinimizedCheckbox])
setWidgetMinimizedButton.onclick = () => {
    const widgetMinimized = widgetMinimizedCheckbox.checked
    adApi.setWidgetMinimized(widgetMinimized)
}

setupHoverEffect(addInteractionAssociatedObjectButton, [associatedObjectTextarea, interactionIdInput])
addInteractionAssociatedObjectButton.onclick = () => {
    let associatedObject: InteractionAssociatedObject | null = null
    try {
        associatedObject = JSON.parse(associatedObjectTextarea.value)
    } catch (e) {
        alert('You have syntax error in the associated object structure. Cannot parse JSON.')
    }
    if (!associatedObject) {
        return
    }
    const itemId = interactionIdInput.value
    adApi.addInteractionAssociatedObject(associatedObject, itemId)
}

setupHoverEffect(setInteractionActiveScreenButton, [activeScreenTextarea, interactionIdInput])
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
    const itemId = interactionIdInput.value
    adApi.setInteractionActiveScreen(activeScreenData, itemId)
}

adApi.on('ON_REQUEST_TRANSFER_DATA', () => {
    let transferData: any | null = null
    try {
        transferData = JSON.parse(transferDataTextarea.value)
    } catch (e) {
        alert('You have syntax error in the transfer data structure. Cannot parse JSON.')
    }
    if (!transferData) {
        return null
    }
    return transferData
})

adApi.on('ON_SEARCH_KNOWLEDGE_BASE', () => {
    let searchKbResult: any | null = null
    try {
        searchKbResult = JSON.parse(searchKBResultTextarea.value)
    } catch (e) {
        alert('You have syntax error in the KB search results data structure. Cannot parse JSON.')
    }
    if (!searchKbResult) {
        return null
    }
    return searchKbResult
})

adApi.on('ON_GET_KNOWLEDGE_BASE_ARTICLE', () => {
    let kbArticleDullData: any | null = null
    try {
        kbArticleDullData = JSON.parse(kbArticleFullDataTextarea.value)
    } catch (e) {
        alert('You have syntax error in the KB Article data structure. Cannot parse JSON.')
    }
    if (!kbArticleDullData) {
        return null
    }
    return kbArticleDullData
})
