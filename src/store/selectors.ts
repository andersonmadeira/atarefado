import { GlobalState } from './store'
import { NotesState } from './slices'

export const selectNotes = (state: GlobalState): NotesState => state.notes
