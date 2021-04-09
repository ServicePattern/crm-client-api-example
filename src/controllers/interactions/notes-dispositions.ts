import {setupHoverEffect} from "../../helpers";
import {AgentDesktopClientAPI} from "../../brightpattern-client-api-types";

export function initializeNotesAndDispositionsHandlers(adApi: AgentDesktopClientAPI) {
    const notesServiceIdInput = document.getElementById('notes_service_id_input')! as HTMLInputElement
    const notesInteractionIdInput = document.getElementById('notes_interaction_id_input')! as HTMLInputElement
    const noteInput = document.getElementById('note_input')! as HTMLInputElement
    const dispositionIdInput = document.getElementById('disposition_id_input')! as HTMLInputElement

    const addNoteButton = document.getElementById('add_note_button')!
    const updateNoteButton = document.getElementById('update_note_button')!
    const replaceNoteButton = document.getElementById('replace_note_button')!
    const getDispositionsListButton = document.getElementById('get_dispositions_list_button')!
    const setDispositionButton = document.getElementById('set_disposition_button')!



    setupHoverEffect(getDispositionsListButton, [notesServiceIdInput, notesInteractionIdInput])
    getDispositionsListButton.onclick = () => {
        const serviceId = notesServiceIdInput.value
        const itemId = notesInteractionIdInput.value
        adApi.getDispositionsList({
            service: serviceId,
            interactionId: itemId,
        })
    }

    setupHoverEffect(setDispositionButton, [dispositionIdInput, notesInteractionIdInput])
    setDispositionButton.onclick = () => {
        const dispositionId = dispositionIdInput.value
        const itemId = notesInteractionIdInput.value
        adApi.setDisposition(dispositionId, itemId)
    }


    setupHoverEffect(addNoteButton, [noteInput, notesInteractionIdInput])
    addNoteButton.onclick = () => {
        const note = noteInput.value
        const itemId = notesInteractionIdInput.value
        adApi.addNote(note, itemId)
    }

    setupHoverEffect(updateNoteButton, [noteInput, notesInteractionIdInput])
    updateNoteButton.onclick = () => {
        const note = noteInput.value
        const itemId = notesInteractionIdInput.value
        adApi.updateNote(note, itemId)
    }

    setupHoverEffect(replaceNoteButton, [noteInput, notesInteractionIdInput])
    replaceNoteButton.onclick = () => {
        const note = noteInput.value
        const itemId = notesInteractionIdInput.value
        adApi.replaceNote(note, itemId)
    }
}