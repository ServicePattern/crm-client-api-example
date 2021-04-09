import {AgentDesktopClientAPI} from "../brightpattern-client-api-types";
import {setupHoverEffect} from "../helpers";

export function initializeTeamsAndServiceHandlers(adApi: AgentDesktopClientAPI) {
    const teamIdInput = document.getElementById('team_id_input')! as HTMLInputElement
    const serviceIdInput = document.getElementById('service_id_input')! as HTMLInputElement

    const getTeamsButton = document.getElementById('get_teams_button')!
    const getTeamMembersButton = document.getElementById('get_team_members_button')!
    const getServicesListButton = document.getElementById('get_services_list_button')!
    const setServiceButton = document.getElementById('set_service_button')!


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
}