import {setupHoverEffect} from "../../helpers";
import {AgentDesktopClientAPI} from "../../brightpattern-client-api-types";

export function initializeEndInteractionHandlers(adApi: AgentDesktopClientAPI) {
    const completeNoteInput = document.getElementById('complete_note_input')! as HTMLInputElement
    const completeInteractionIdInput = document.getElementById('complete_interaction_id_input')! as HTMLInputElement
    const completeDispositionIdInput = document.getElementById('complete_disposition_id_input')! as HTMLInputElement

    const completeDestroyCallConferenceButton = document.getElementById('complete_destroy_call_conference_button')!
    const leaveInteractionButton = document.getElementById('leave_interaction_button')!
    const completeInteractionButton = document.getElementById('complete_interaction_button')!
    const leaveAndCompleteInteractionButton = document.getElementById('leave_and_complete_interaction_button')!

    setupHoverEffect(completeDestroyCallConferenceButton, [completeInteractionIdInput])
    completeDestroyCallConferenceButton.onclick = () => {
        const itemId = completeInteractionIdInput.value
        adApi.destroyCallConference(itemId)
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


}