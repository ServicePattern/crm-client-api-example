import { AgentDesktopClientAPI } from "../brightpattern-client-api-types";
import {setupHoverEffect} from "../helpers";

export function initializeRescheduleHandlers(adApi: AgentDesktopClientAPI) {
    const fromTimeInput = document.getElementById('from_time_input')! as HTMLInputElement
    const untilTimeInput = document.getElementById('until_time_input')! as HTMLInputElement
    const timezoneCodeInput = document.getElementById('timezone_code_input')! as HTMLInputElement

    const reschedulePhoneNumberInput = document.getElementById('reschedule_phone_number_input')! as HTMLInputElement
    const rescheduleInteractionIdInput = document.getElementById('reschedule_interaction_id_input')! as HTMLInputElement
    const setRescheduleWindowButton = document.getElementById('set_reschedule_window_button')!

    setupHoverEffect(setRescheduleWindowButton, [reschedulePhoneNumberInput, rescheduleInteractionIdInput, fromTimeInput, untilTimeInput, timezoneCodeInput])
    setRescheduleWindowButton.onclick = () => {
        const phoneNumber = reschedulePhoneNumberInput.value
        const itemId = rescheduleInteractionIdInput.value
        const fromTime = fromTimeInput.value
        const untilTime = untilTimeInput.value
        const timezoneCode = timezoneCodeInput.value
        adApi.setRescheduleWindow({numberToDial: phoneNumber, fromTime, untilTime, timezoneCode}, itemId)
    }
}