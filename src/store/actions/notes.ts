import { fetchNotes, saveNotes } from '../../storage'
import { selectNotes } from '../selectors'
import {
  actionSaveNoteStart,
  actionSaveNoteSuccess,
  actionSaveNoteFailure,
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
    dispatch(actionFetchNotesStart())

    const notes = await fetchNotes()

    dispatch(actionFetchNotesSuccess(notes))
  } catch (err) {
    dispatch(actionFetchNotesFailure(err))
  }
}

export const actionSaveNote = (note: Note): AppThunk => async (dispatch, getState) => {
  try {
    const { notes } = selectNotes(getState())

    dispatch(actionSaveNoteStart())

    if (!note.id) {
      note.id = await uuid.getRandomUUID()
    }

    notes[note.id] = note

    await saveNotes(notes)

    dispatch(actionSaveNoteSuccess(note))
  } catch (err) {
    dispatch(actionSaveNoteFailure(err))
  }
}

export const actionRemoveNote = (id: string): AppThunk => async (dispatch, getState) => {
  try {
    const { notes } = selectNotes(getState())

    dispatch(actionRemoveNoteStart())

    notes[id] = undefined

    await saveNotes(notes)

    dispatch(actionRemoveNoteSuccess(id))
  } catch (err) {
    dispatch(actionRemoveNoteFailure(err))
  }
}
