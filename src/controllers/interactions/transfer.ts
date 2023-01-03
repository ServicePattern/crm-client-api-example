import {AgentDesktopClientAPI} from "../../brightpattern-client-api-types";
import {setupHoverEffect} from "../../helpers";

export function initializeTransferInteractionHandlers(adApi: AgentDesktopClientAPI) {
    const interactionIdInput = document.getElementById('interaction_id_input')! as HTMLInputElement
    const transferPhoneNumberInput = document.getElementById('transfer_phone_number_input')! as HTMLInputElement
    const mainItemIdInput = document.getElementById('main_item_id_input')! as HTMLInputElement
    const consultCallIdInput = document.getElementById('consult_call_id_input')! as HTMLInputElement

    const transferDataTextarea = document.getElementById('transfer_data_textarea')! as HTMLTextAreaElement

    const consultCallButton = document.getElementById('consult_call_button')!
    const blindTransferButton = document.getElementById('blind_transfer_button')!
    const transferButton = document.getElementById('transfer_button')!

    setupHoverEffect(blindTransferButton, [transferPhoneNumberInput, interactionIdInput, transferDataTextarea])
    blindTransferButton.onclick = () => {
        const phoneNumber = transferPhoneNumberInput.value
        const itemId = interactionIdInput.value
        let transferData: any = undefined
        try {
            transferData = JSON.parse(transferDataTextarea.value)
        } catch (e) {
            alert('You have syntax error in the transfer data structure. Cannot parse JSON.')
        }
        adApi.blindTransfer(phoneNumber, transferData, itemId)
    }

    setupHoverEffect(consultCallButton, [transferPhoneNumberInput])
    consultCallButton.onclick = () => {
        const phoneNumber = transferPhoneNumberInput.value
        adApi.consultCall(phoneNumber)
    }

    setupHoverEffect(transferButton, [mainItemIdInput, consultCallIdInput, transferDataTextarea])
    transferButton.onclick = () => {
        const mainItemId = mainItemIdInput.value
        const consultCallId = consultCallIdInput.value
        let transferData: any = undefined
        try {
            transferData = JSON.parse(transferDataTextarea.value)
        } catch (e) {
            alert('You have syntax error in the transfer data structure. Cannot parse JSON.')
        }
        adApi.transfer(transferData, mainItemId, consultCallId)
    }

    adApi.on('ON_REQUEST_TRANSFER_DATA', () => {
        let transferData: any = undefined
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

    adApi.on('ON_LOAD_TRANSFER_DATA', (itemId, data) => {
        console.info(`@@@ get transfer data for item ${itemId}: \n\n${JSON.stringify(data)}`)
    })
}