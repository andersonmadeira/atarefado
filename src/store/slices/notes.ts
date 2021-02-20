import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Note } from '../../types'

export interface NotesState {
  loading: boolean
  error: string | null
  notes: Record<string, Note>
}

export const initialNotesState: NotesState = { loading: false, error: null, notes: {} }

export const notesSlice = createSlice({
  name: 'notes',
  initialState: initialNotesState,
  reducers: {
    actionSaveNoteStart: state => {
      state.loading = true
    },
    actionSaveNoteSuccess: state => {
      state.loading = false
      state.error = null
    },
    actionSaveNoteFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    actionUpdateNoteStart: state => {
      state.loading = true
    },
    actionUpdateNoteSuccess: state => {
      state.loading = false
      state.error = null
    },
    actionUpdateNoteFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    actionRemoveNoteStart: state => {
      state.loading = true
    },
    actionRemoveNoteSuccess: state => {
      state.loading = false
      state.error = null
    },
    actionRemoveNoteFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    actionFetchNotesStart: state => {
      state.loading = true
    },
    actionFetchNotesSuccess: (state, action: PayloadAction<Record<string, Note>>) => {
      state.notes = action.payload
      state.loading = false
      state.error = null
    },
    actionFetchNotesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    actionSaveNote: (state, action: PayloadAction<Note>) => {
      state.notes[action.payload.id] = action.payload
    },
    actionRemoveNote: (state, action: PayloadAction<string>) => {
      state.notes[action.payload] = undefined
    },
  },
})

export const {
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
  actionSaveNote,
  actionRemoveNote,
} = notesSlice.actions
