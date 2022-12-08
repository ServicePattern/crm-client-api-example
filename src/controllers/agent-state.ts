import { AgentDesktopClientAPI } from "../brightpattern-client-api-types"
import {setupHoverEffect} from "../helpers";

export function initializeAgentStateHandlers(adApi: AgentDesktopClientAPI) {
    const agentStateInput = document.getElementById('agent_state_input')! as HTMLInputElement
    const notReadyReasonInput = document.getElementById('not_ready_reason_input')! as HTMLInputElement

    const getAgentStateButton = document.getElementById('get_agent_state_button')!
    const setAgentStateButton = document.getElementById('set_agent_state_button')!
    const getAgentNotReadyReasonsButton = document.getElementById('get_agent_not_ready_reasons_button')!

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

    setupHoverEffect(getAgentNotReadyReasonsButton, [])
    getAgentNotReadyReasonsButton.onclick = () => {
        adApi.getAgentNotReadyReasons()
    }
}