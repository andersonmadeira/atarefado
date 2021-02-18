import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { notes } from '../constants'
import { Note } from '../types'

export interface NoteState {
  notes: Record<string, Note>
}

const initialNotesState: NoteState = { notes: {} }

const notesSlice = createSlice({
  name: 'notes',
  initialState: initialNotesState,
  reducers: {
    addNote: state => state + 1,
    updateNote: state => state - 1,
    removeNote: (state, action: PayloadAction<string>) => {
      state.notes[action.payload] = undefined
    },
  },
})

const store = configureStore({
  reducer: notesSlice.reducer,
})
