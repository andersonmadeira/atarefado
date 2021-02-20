import { combineReducers } from '@reduxjs/toolkit'

import { notesSlice } from './notes'

export * from './notes'

export const rootReducer = combineReducers({
  notes: notesSlice.reducer,
})
