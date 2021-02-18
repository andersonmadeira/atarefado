import React, { useCallback, useState } from 'react'
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
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { Note, RootStackParamList } from '../../types'
import { useDebounce, useNotes } from '../../hooks'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

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
  const { elements: noteListElements, amount: amountOfNotes } = useNotes({
    searchTerm: debouncedSearchTerm,
    onPress: navigateToEditor,
  })

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
            <View style={styles.content}>
              {amountOfNotes ? (
                noteListElements
              ) : (
                <Text style={styles.emptyText}>You don't have any notes so far</Text>
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
  emptyText: {
    color: '#555',
    marginTop: 50,
  },
  fabButton: {
    position: 'absolute',
    backgroundColor: '#5682A3',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 10,
    shadowColor: '#5682A3',
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 10,
    },
  },
})
