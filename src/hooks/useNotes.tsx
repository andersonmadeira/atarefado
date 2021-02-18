import React, { useState, useEffect, useCallback } from 'react'
import { Alert, Dimensions, StyleSheet, View } from 'react-native'
import uuid from 'react-native-uuid-generator'

import { NoteCard } from '../components'
import { Note } from '../types'
import { shortenText } from '../utils/text'
import { fetchNotes, saveNotes } from '../storage'
import { notes as sampleNotes } from '../constants'

const windowSize = Dimensions.get('window')

export interface UseNotesReturn {
  elements: JSX.Element
  amount: number
  saveNote: (note: Note) => Promise<void>
  removeNote: (id: string) => Promise<void>
}

export interface UseNotesParams {
  searchTerm?: string
  onPress?: (note: Note) => void
}

export function useNotes({ searchTerm = '', onPress }: UseNotesParams = {}): UseNotesReturn {
  const [notes, setNotes] = useState<Record<string, Note>>({})
  const [elements, setElements] = useState<JSX.Element>(null)

  const saveNote = useCallback(
    async (note: Note): Promise<void> => {
      if (note.id === undefined) {
        note.id = await uuid.getRandomUUID()
      }

      const newNotes = { ...notes, [note.id]: note }

      await saveNotes(newNotes)
      setNotes(newNotes)
    },
    [notes],
  )

  const removeNote = useCallback(
    async (id: string): Promise<void> => {
      notes[id] = undefined
      await saveNotes(notes)
      setNotes(notes)
    },
    [notes],
  )

  useEffect(() => {
    const retrieveStoredNotes = async () => {
      try {
        //await saveNotes({})
        const storedNotes = await fetchNotes()
        setNotes(Object.keys(storedNotes).length ? storedNotes : sampleNotes)
      } catch {
        Alert.alert('Error occured', 'Failed to retrieve notes')
      }
    }

    retrieveStoredNotes()
  }, [])

  useEffect(() => {
    const leftNotes = []
    const rightNotes = []
    const searchRegEx = new RegExp(searchTerm, 'i')
    let currentPosition = 0
    const noteKeys = Object.keys(notes)

    for (let i = 0; i < noteKeys.length; i++) {
      const note = notes[noteKeys[i]]
      const notesPlainContent = note.content.replace(/(<([^>]+)>)/gi, '')

      if (!searchRegEx.test(notesPlainContent)) {
        continue
      }

      const excerpt = shortenText(notesPlainContent, 50)

      console.log('note.id', note.id)

      const noteElement = (
        <NoteCard
          key={note.id}
          title={note.title}
          text={`${excerpt}${excerpt.length < notesPlainContent.length ? '...' : ''}`}
          onPress={() => onPress && onPress(note)}
        />
      )

      currentPosition += 1

      if (currentPosition % 2) {
        leftNotes.push(noteElement)
        continue
      }

      rightNotes.push(noteElement)
    }

    setElements(
      <>
        <View style={styles.contentColumn}>{leftNotes}</View>
        <View style={styles.contentColumn}>{rightNotes}</View>
      </>,
    )
  }, [searchTerm, notes, onPress])

  return {
    elements,
    amount: Object.keys(notes).length,
    saveNote,
    removeNote,
  }
}

const styles = StyleSheet.create({
  contentColumn: {
    flexGrow: 0,
    flexBasis: Math.ceil(windowSize.width) / 2 - 20,
  },
})
