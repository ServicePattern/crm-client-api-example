import {setupHoverEffect} from "../helpers";
import {AgentDesktopClientAPI} from "../brightpattern-client-api-types";

export function initializePhoneDeviceHandlers(adApi: AgentDesktopClientAPI) {
    const phoneDeviceTypeInput = document.getElementById('phone_device_type_input')! as HTMLInputElement
    const phoneDeviceNumberInput = document.getElementById('phone_device_number_input')! as HTMLInputElement

    const getPhoneDeviceButton = document.getElementById('get_phone_device_button')!
    const setPhoneDeviceButton = document.getElementById('set_phone_device_button')!
    const getPhoneDevicesListButton = document.getElementById('get_phone_devices_list_button')!


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

}