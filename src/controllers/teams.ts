import {AgentDesktopClientAPI} from "../brightpattern-client-api-types";
import {setupHoverEffect} from "../helpers";

export function initializeTeamsHandlers(adApi: AgentDesktopClientAPI) {
    const teamIdInput = document.getElementById('team_id_input')! as HTMLInputElement

    const getTeamsButton = document.getElementById('get_teams_button')!
    const getTeamMembersButton = document.getElementById('get_team_members_button')!


    setupHoverEffect(getTeamsButton, [])
    getTeamsButton.onclick = () => {
        adApi.getTeams()
    }

    setupHoverEffect(getTeamMembersButton, [teamIdInput])
    getTeamMembersButton.onclick = () => {
        const teamId = teamIdInput.value
        adApi.getTeamMembers(teamId)
    }
}