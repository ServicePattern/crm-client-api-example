import {AgentDesktopClientAPI} from "../../brightpattern-client-api-types";
import {setupHoverEffect} from "../../helpers";

export function initializeConferenceInteractionHandlers(adApi: AgentDesktopClientAPI) {
    const conferencePhoneNumberInput = document.getElementById('conference_phone_number_input')! as HTMLInputElement
    const partyIdInput = document.getElementById('party_id_input')! as HTMLInputElement
    const conferenceInteractionIdInput = document.getElementById('conference_interaction_id_input')! as HTMLInputElement

    const conferenceTransferDataTextarea = document.getElementById('conference_transfer_data_textarea')! as HTMLTextAreaElement

    const inviteToCallConferenceButton = document.getElementById('add_to_call_conference_button')!
    const removeFromCallConferenceButton = document.getElementById('remove_from_call_conference_button')!
    const destroyCallConferenceButton = document.getElementById('destroy_call_conference_button')!


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


}