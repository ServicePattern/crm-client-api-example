// need to use `import type` when using local copy of .d.ts for brightpattern API types
import type {InteractionAssociatedObject} from './brightpattern-client-api-types'

const integrationKey = 'test-adapter'

const messageClass = {
    'o': 'outgoing',
    'ir': 'incoming-result',
    'i': 'incoming',
    'or': 'outgoing-result',
    'e': 'error',
}

const logs = document.getElementById('log')!
const adcMountNode = document.getElementById('adc_mount_node') as HTMLIFrameElement

const getAgentStateButton = document.getElementById('get_agent_state_button')!
const setAgentStateButton = document.getElementById('set_agent_state_button')!
const agentStateInput = document.getElementById('agent_state_input')! as HTMLInputElement
const notReadyReasonInput = document.getElementById('not_ready_reason_input')! as HTMLInputElement

const startCallButton = document.getElementById('start_call_button')!
const startSMSChatButton = document.getElementById('start_sms_chat_button')!
const phoneNumberInput = document.getElementById('phone_number_input')! as HTMLInputElement

const startEmailButton = document.getElementById('start_email_button')!
const emailAddressInput = document.getElementById('email_address_input')! as HTMLInputElement

const interactionIdInput = document.getElementById('interaction_id_input')! as HTMLInputElement

const terminateCallButton = document.getElementById('terminate_call_button')!
const completeInteractionButton = document.getElementById('complete_interaction_button')!
const switchActiveInteractionButton = document.getElementById('switch_active_interaction_button')!

const changeServiceButton = document.getElementById('change_service')!
const serviceNameInput = document.getElementById('service_name_input')! as HTMLInputElement

const setDispositionButton = document.getElementById('set_disposition')!
const dispositionNameInput = document.getElementById('disposition_name_input')! as HTMLInputElement
const dispositionCodeInput = document.getElementById('disposition_code_input')! as HTMLInputElement

const getCallRecordingStatusButton = document.getElementById('get_call_recording_status_button')!
const setCallRecordingStatusButton = document.getElementById('set_call_recording_status_button')!
const callRecordingCheckbox = document.getElementById('call_recording_checkbox')! as HTMLInputElement

const getScreenRecordingStatusButton = document.getElementById('get_screen_recording_status_button')!
const setScreenRecordingStatusButton = document.getElementById('set_screen_recording_status_button')!
const screenRecordingCheckbox = document.getElementById('screen_recording_checkbox')! as HTMLInputElement

const muteAllButton = document.getElementById('mute_all_button')!
const unmuteAllButton = document.getElementById('unmute_all_button')!
const muteTargetSelect = document.getElementById('mute_target_select')! as HTMLSelectElement

const setVariableButton = document.getElementById('set_variable_button')!
const variableNameInput = document.getElementById('variable_name_input')! as HTMLInputElement
const variableValueInput = document.getElementById('variable_value_input')! as HTMLInputElement

const getConfigButton = document.getElementById('get_config_button')!
const notifyWidgetMinimizedButton = document.getElementById('notify_widget_minimized_button')!
const notifyWidgetMaximizedButton = document.getElementById('notify_widget_maximized_button')!

const addInteractionAssociatedObjectButton = document.getElementById('add_interaction_associated_object_button')!
const associatedObjectTextarea = document.getElementById('associated_object_textarea')! as HTMLTextAreaElement

const setInteractionActiveScreenButton = document.getElementById('set_interaction_active_screen_button')!
const activeScreenTextarea = document.getElementById('active_screen_textarea')! as HTMLTextAreaElement

const transferDataTextarea = document.getElementById('transfer_data_textarea')! as HTMLTextAreaElement
const searchKBResultTextarea = document.getElementById('search_kb_result_textarea')! as HTMLTextAreaElement
const kbArticleFullDataTextarea = document.getElementById('kb_article_full_data_textarea')! as HTMLTextAreaElement

const adApi = new window.brightpattern.AdApi(integrationKey, adcMountNode)

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

adApi.injectIncomingMessageLogger((message, data) => {
    if (message.endsWith('RESPONSE')) {
        log(data.status === 'success' ? 'ir' : 'e', message, JSON.stringify(data))
    } else {
        log('i', message, data ? JSON.stringify(data) : '')
    }
})

adApi.injectOutgoingMessageLogger((message, data) => {
    if (message.endsWith('RESPONSE')) {
        log('or', message, data ? JSON.stringify(data) : '')
    } else {
        log('o', message, data ? JSON.stringify(data) : '')
    }
})

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

setupHoverEffect(startCallButton, [phoneNumberInput])
startCallButton.onclick = () => {
    const phone = phoneNumberInput.value
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

setupHoverEffect(startSMSChatButton, [phoneNumberInput])
startSMSChatButton.onclick = () => {
    const phone = phoneNumberInput.value
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
    adApi.startSMSChat(phone, associatedObject)
}

setupHoverEffect(startEmailButton, [emailAddressInput])
startEmailButton.onclick = () => {
    const phone = emailAddressInput.value
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
    adApi.startEmail(phone, associatedObject)
}

setupHoverEffect(terminateCallButton, [interactionIdInput])
terminateCallButton.onclick = () => {
    const itemId = interactionIdInput.value
    adApi.terminateCall(itemId)
}

setupHoverEffect(completeInteractionButton, [interactionIdInput])
completeInteractionButton.onclick = () => {
    const itemId = interactionIdInput.value
    adApi.completeInteraction(itemId)
}

setupHoverEffect(switchActiveInteractionButton, [interactionIdInput])
switchActiveInteractionButton.onclick = () => {
    const itemId = interactionIdInput.value
    adApi.switchActiveInteraction(itemId)
}

setupHoverEffect(changeServiceButton, [serviceNameInput])
changeServiceButton.onclick = () => {
    const serviceName = serviceNameInput.value
    adApi.changeService(serviceName)
}

setupHoverEffect(setDispositionButton, [dispositionNameInput, dispositionCodeInput, interactionIdInput])
setDispositionButton.onclick = () => {
    const dispositionName = dispositionNameInput.value
    const dispositionCode = dispositionCodeInput.value
    const itemId = interactionIdInput.value
    adApi.setDisposition({
        code: dispositionCode,
        name: dispositionName,
    }, itemId)
}

setupHoverEffect(getCallRecordingStatusButton, [interactionIdInput])
getCallRecordingStatusButton.onclick = () => {
    const itemId = interactionIdInput.value
    adApi.getCallRecordingStatus(itemId)
}

setupHoverEffect(setCallRecordingStatusButton, [interactionIdInput, callRecordingCheckbox])
setCallRecordingStatusButton.onclick = () => {
    const itemId = interactionIdInput.value
    const enableRecording = callRecordingCheckbox.checked
    adApi.setCallRecordingStatus(enableRecording, itemId)
}

setupHoverEffect(getScreenRecordingStatusButton, [])
getScreenRecordingStatusButton.onclick = () => {
    adApi.getScreenRecordingStatus()
}

setupHoverEffect(setScreenRecordingStatusButton, [screenRecordingCheckbox])
setScreenRecordingStatusButton.onclick = () => {
    const enableRecording = screenRecordingCheckbox.checked
    adApi.setScreenRecordingStatus(enableRecording)
}

setupHoverEffect(muteAllButton, [muteTargetSelect])
muteAllButton.onclick = () => {
    const muteTarget = muteTargetSelect.value
    adApi.muteAll(muteTarget as any)
}

setupHoverEffect(unmuteAllButton, [muteTargetSelect])
unmuteAllButton.onclick = () => {
    const muteTarget = muteTargetSelect.value
    adApi.unmuteAll(muteTarget as any)
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

setupHoverEffect(notifyWidgetMinimizedButton, [])
notifyWidgetMinimizedButton.onclick = () => {
    adApi.notifyWidgetMinimized()
}

setupHoverEffect(notifyWidgetMaximizedButton, [])
notifyWidgetMaximizedButton.onclick = () => {
    adApi.notifyWidgetMaximized()
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

adApi.on('REQUEST_TRANSFER_DATA', () => {
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

adApi.on('SEARCH_KNOWLEDGE_BASE', () => {
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

adApi.on('GET_KNOWLEDGE_BASE_ARTICLE', () => {
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
