import React, { useCallback, useMemo, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { Note, RootStackParamList } from '../../types'
import { useDebounce } from '../../hooks'
import { NoteCard } from '../../components'
import { useSelector } from 'react-redux'
import { selectNotes } from '../../store'
import { shortenText } from '../../utils/text'
import { theme } from '../../utils/theme'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

const windowSize = Dimensions.get('window')

export const HomeScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 350)
  const navigation = useNavigation<HomeScreenNavigationProp>()
  const navigateToEditor = useCallback(
    (note: Note) => {
      navigation.navigate('Editor', { note })
    },
    [navigation],
  )
  const { notes } = useSelector(selectNotes)

  const noteListElements = useMemo(() => {
    const leftNotes = []
    const rightNotes = []
    const searchRegEx = new RegExp(debouncedSearchTerm, 'i')
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
          onPress={() => navigateToEditor(note)}
        />
      )

      currentPosition += 1

      if (currentPosition % 2) {
        leftNotes.push(noteElement)
        continue
      }

      rightNotes.push(noteElement)
    }

    return leftNotes.length || rightNotes.length ? (
      <>
        <View style={styles.contentColumn}>{leftNotes}</View>
        <View style={styles.contentColumn}>{rightNotes}</View>
      </>
    ) : null
  }, [debouncedSearchTerm, notes, navigateToEditor])

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.secondary} />
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
          <View style={styles.main}>
            <View style={styles.searchContainer}>
              <Icon name="search" size={15} color="#999" />
              <TextInput
                placeholder="Procurar anotações"
                value={searchTerm}
                onChangeText={text => setSearchTerm(text)}
                style={styles.searchInput}
              />
              {searchTerm !== '' && (
                <TouchableOpacity onPress={() => setSearchTerm('')} style={styles.clearButton}>
                  <Icon name="times" size={15} color="#999" />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.content}>
              {noteListElements ? (
                noteListElements
              ) : (
                <Text style={styles.emptyText}>No notes were found</Text>
              )}
            </View>
          </View>
        </ScrollView>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Editor', {})}>
          <View style={styles.fabButton}>
            <AntIcon name="plus" size={30} color="#fff" />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
    backgroundColor: theme.secondary,
  },
  main: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ededed',
    borderRadius: 25,
    margin: 15,
    paddingVertical: 0,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 15,
  },
  clearButton: {
    padding: 8,
    marginRight: -4,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  contentColumn: {
    flexGrow: 0,
    flexBasis: Math.ceil(windowSize.width) / 2 - 20,
  },
  emptyText: {
    color: '#555',
    marginTop: 50,
  },
  fabButton: {
    position: 'absolute',
    backgroundColor: theme.primary,
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 10,
    shadowColor: theme.primary,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 10,
    },
  },
})
