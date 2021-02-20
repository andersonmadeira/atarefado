import uuid from 'react-native-uuid-generator'

import { fetchNotes, saveNotes } from '../../storage'
import { selectNotes } from '../selectors'
import {
  actionSaveNote,
  actionSaveNoteStart,
  actionSaveNoteSuccess,
  actionSaveNoteFailure,
  actionUpdateNoteStart,
  actionUpdateNoteSuccess,
  actionUpdateNoteFailure,
  actionRemoveNoteStart,
  actionRemoveNoteSuccess,
  actionRemoveNoteFailure,
  actionFetchNotesStart,
  actionFetchNotesSuccess,
  actionFetchNotesFailure,
} from '../slices'
import { AppThunk } from '../store'

export const actionFetchNotes = (): AppThunk => async dispatch => {
  try {
    dispatch(actionFetchNotesStart(err))

    const notes = await fetchNotes()

    dispatch(actionFetchNotesSuccess(notes))
  } catch (err) {
    dispatch(actionFetchNotesFailure(err))
  }
}

export const actionAddNote = (title: string, content: string): AppThunk => async (
  dispatch,
  getState,
) => {
  try {
    const { notes } = selectNotes(getState())

    dispatch(actionSaveNoteStart(err))

    const id = await uuid.getRandomUUID()

    const note = { id, title, content }

    notes[note.id] = note

    await saveNotes(notes)

    dispatch(actionSaveNote(note))
    dispatch(actionSaveNoteSuccess())
  } catch (err) {
    dispatch(actionSaveNoteFailure(err))
  }
}

export const actionUpdateNote = (note: Note): AppThunk => async (dispatch, getState) => {
  try {
    const { notes } = selectNotes(getState())

    dispatch(actionUpdateNoteStart())

    notes[note.id] = note

    await saveNotes(notes)

    dispatch(actionSaveNote(note))
    dispatch(actionUpdateNoteSuccess())
  } catch (err) {
    dispatch(actionUpdateNoteFailure(err))
  }
}

export const actionRemoveNote = (id: string): AppThunk => async (dispatch, getState) => {
  try {
    const { notes } = selectNotes(getState())

    dispatch(actionRemoveNoteStart())

    notes[id] = undefined

    await saveNotes(notes)

    dispatch(actionRemoveNote(id))
    dispatch(actionRemoveNoteSuccess())
  } catch (err) {
    dispatch(actionRemoveNoteFailure(err))
  }
}
