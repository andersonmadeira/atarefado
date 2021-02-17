import React, { useMemo, useState } from 'react'
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { Note, RootStackParamList } from '../types'
import { FabButton, NoteCard } from '../../components'
import { shortenText } from '../../utils/text'

const windowSize = Dimensions.get('window')

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

export const notes: Note[] = [
  {
    id: '1',
    title: 'Something',
    content: '<b>Something</b> here',
  },
  {
    id: '2',
    title: 'Lorem ipsum',
    content:
      '<em>Lorem</em> ipsum <b>dolor</b> sit, amet consectetur adipisicing elit. consectetur adipisicing elit.',
  },
  {
    id: '3',
    title: 'Magni ipsam',
    content: 'Magni ipsam, <em>provident</em> explicabo facilis nihil doloremque.',
  },
  {
    id: '4',
    title: 'Magni ipsam',
    content: 'Magni <em><b>ipsam</b></em>, provident explicabo facilis nihil doloremque.',
  },
  {
    id: '5',
    title: 'Magni ipsam',
    content: '<b>Magni ipsam, provident explicabo</b> facilis nihil doloremque.',
  },
  {
    id: '6',
    title: 'Vel quisquam',
    content: '<b>Vel quisquam</b>, esse <em><b>quidem quae ea dolorum</b></em> aut corrupt',
  },
  {
    id: '7',
    title: 'Fugit magnam',
    content: 'Fugit magnam quaerat molestiae voluptate adipisci harum reprehenderit aliquam',
  },
  {
    id: '8',
    title: 'Autem optio',
    content: 'Autem optio exercitationem consequuntur cumque impedit',
  },
  {
    id: '9',
    title: 'Animi tempora',
    content: 'Animi tempora asperiores illum facere! Accusamus cupiditate accusantium quia!',
  },
  {
    id: '10',
    title: 'Corporis cupiditate',
    content: 'Corporis cupiditate dolorum iure quisquam numquam nesciunt',
  },
]

export const HomeScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigation = useNavigation<HomeScreenNavigationProp>()

  const noteList = useMemo(() => {
    const leftNotes = []
    const rightNotes = []
    const searchRegEx = new RegExp(searchTerm, 'i')
    let currentPosition = 0

    for (let i = 0; i < notes.length; i++) {
      const notesPlainContent = notes[i].content.replace(/(<([^>]+)>)/gi, '')

      if (!searchRegEx.test(notesPlainContent)) {
        continue
      }

      const noteElement = (
        <NoteCard
          key={notes[i].id}
          text={shortenText(notesPlainContent, 50)}
          onPress={() => navigation.navigate('Editor', { note: notes[i] })}
        />
      )

      currentPosition += 1

      if (currentPosition % 2) {
        leftNotes.push(noteElement)
        continue
      }

      rightNotes.push(noteElement)
    }

    return (
      <>
        <View style={styles.contentColumn}>{leftNotes}</View>
        <View style={styles.contentColumn}>{rightNotes}</View>
      </>
    )
  }, [searchTerm, navigation])

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F7F7" />
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
            <View style={styles.content}>{noteList}</View>
          </View>
        </ScrollView>
        <FabButton
          buttons={[
            {
              icon: <AntIcon name="check" size={20} color="#fff" />,
              action: () => console.log('Check!'),
            },
            {
              icon: <AntIcon name="tago" size={20} color="#fff" />,
              action: () => console.log('Category!'),
            },
            {
              icon: <AntIcon name="filetext1" size={20} color="#fff" />,
              action: () => console.log('Note!'),
            },
          ]}
        />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
    backgroundColor: '#f7f7f7',
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
})
