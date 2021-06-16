import {AgentDesktopClientAPI} from "../brightpattern-client-api-types";
import {setupHoverEffect} from "../helpers";

export function initializeServicesAndDIDHandlers(adApi: AgentDesktopClientAPI) {
    const serviceIdInput = document.getElementById('service_id_input')! as HTMLInputElement
    const didPhoneInput = document.getElementById('did_phone_input')! as HTMLInputElement

    const getServiceButton = document.getElementById('get_service_button')!
    const getServicesListButton = document.getElementById('get_services_list_button')!
    const setServiceButton = document.getElementById('set_service_button')!
    const getDIDNumberButton = document.getElementById('get_did_number_button')!
    const getDIDNumbersListButton = document.getElementById('get_did_numbers_list_button')!
    const setDIDNumberButton = document.getElementById('set_did_number_button')!


    setupHoverEffect(getServiceButton, [])
    getServiceButton.onclick = () => {
        adApi.getService()
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

    setupHoverEffect(getDIDNumberButton, [])
    getDIDNumberButton.onclick = () => {
        adApi.getDIDNumber()
    }

    setupHoverEffect(getDIDNumbersListButton, [])
    getDIDNumbersListButton.onclick = () => {
        adApi.getDIDNumbersList()
    }

    setupHoverEffect(setDIDNumberButton, [didPhoneInput])
    setDIDNumberButton.onclick = () => {
        const didPhoneNumber = didPhoneInput.value
        adApi.setDIDNumber(didPhoneNumber)
    }
}