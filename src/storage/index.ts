import AsyncStorage from '@react-native-async-storage/async-storage'

import { Note } from '../types'

const NOTES_KEY = '@notes'

export async function fetchNotes(): Promise<Note[]> {
  const jsonValue = await AsyncStorage.getItem(NOTES_KEY)
  return jsonValue !== null ? JSON.parse(jsonValue) : []
}

export async function saveNotes(notes: Note[]): Promise<void> {
  const jsonValue = JSON.stringify(notes)
  await AsyncStorage.setItem(NOTES_KEY, jsonValue)
}
