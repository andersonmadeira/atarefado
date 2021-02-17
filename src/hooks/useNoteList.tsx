import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

import { NoteCard } from '../components'
import { notes } from '../constants'
import { shortenText } from '../utils/text'

const windowSize = Dimensions.get('window')

export function useNoteList(searchTerm: string, onPress: (note: Note) => void): JSX.Element {
  const [elements, setElements] = useState<JSX.Element>(null)

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
          onPress={() => onPress(notes[i])}
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
  }, [searchTerm, onPress])

  return elements
}

const styles = StyleSheet.create({
  contentColumn: {
    flexGrow: 0,
    flexBasis: Math.ceil(windowSize.width) / 2 - 20,
  },
})
