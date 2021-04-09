import { AgentDesktopClientAPI } from "../brightpattern-client-api-types";
import {setupHoverEffect} from "../helpers";

export function initializeScreenRecordingHandlers(adApi: AgentDesktopClientAPI) {
    const screenRecordingMuteCheckbox = document.getElementById('screen_recording_mute_checkbox')! as HTMLInputElement

    const setScreenRecordingMuteButton = document.getElementById('set_screen_recording_mute_button')!
    const getScreenRecordingStateButton = document.getElementById('get_screen_recording_state_button')!


    setupHoverEffect(setScreenRecordingMuteButton, [screenRecordingMuteCheckbox])
    setScreenRecordingMuteButton.onclick = () => {
        const muteScreenRecording = screenRecordingMuteCheckbox.checked
        adApi.setScreenRecordingMute(muteScreenRecording)
    }
    screenRecordingMuteCheckbox.addEventListener('change', (evt) =>{
        const screenRecordingMute = (evt.target as HTMLInputElement).checked
        setScreenRecordingMuteButton.innerHTML = `setScreenRecordingMute (${screenRecordingMute ? 'mute' : 'unmute'})`
    })

    setupHoverEffect(getScreenRecordingStateButton, [])
    getScreenRecordingStateButton.onclick = () => {
        adApi.getScreenRecordingState()
    }
}