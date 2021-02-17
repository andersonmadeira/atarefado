import React, { useState, useEffect, useCallback } from 'react'
import { Alert, Dimensions, StyleSheet, View } from 'react-native'

import { NoteCard } from '../components'
import { Note } from '../types'
import { shortenText } from '../utils/text'
import { fetchNotes, saveNotes } from '../storage'
import { notes as sampleNotes } from '../constants'

const windowSize = Dimensions.get('window')

export interface UseNotesReturn {
  elements: JSX.Element
  amount: number
  addNote: (note: Note) => Promise<void>
  removeNote: (id: string) => Promise<void>
}

export interface UseNotesParams {
  searchTerm?: string
  onPress?: (note: Note) => void
}

export function useNotes({ searchTerm = '', onPress }: UseNotesParams = {}): UseNotesReturn {
  const [notes, setNotes] = useState<Note[]>([])
  const [elements, setElements] = useState<JSX.Element>(null)

  const addNote = useCallback(
    async (note: Note): Promise<void> => {
      const newNotes = [...notes, note]
      saveNotes(newNotes)
      setNotes(newNotes)
    },
    [notes],
  )

  const removeNote = useCallback(
    async (id: string): Promise<void> => {
      const newNotes = notes.filter(n => n.id !== id)
      saveNotes(newNotes)
      setNotes(newNotes)
    },
    [notes],
  )

  useEffect(() => {
    const retrieveStoredNotes = async () => {
      try {
        const storedNotes = await fetchNotes()
        setNotes(storedNotes.length ? storedNotes : sampleNotes)
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

    for (let i = 0; i < notes.length; i++) {
      const notesPlainContent = notes[i].content.replace(/(<([^>]+)>)/gi, '')

      if (!searchRegEx.test(notesPlainContent)) {
        continue
      }

      const excerpt = shortenText(notesPlainContent, 50)

      const noteElement = (
        <NoteCard
          key={notes[i].id}
          title={notes[i].title}
          text={`${excerpt}${excerpt.length < notesPlainContent.length ? '...' : ''}`}
          onPress={() => onPress && onPress(notes[i])}
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
    amount: notes.length,
    addNote,
    removeNote,
  }
}

const styles = StyleSheet.create({
  contentColumn: {
    flexGrow: 0,
    flexBasis: Math.ceil(windowSize.width) / 2 - 20,
  },
})
