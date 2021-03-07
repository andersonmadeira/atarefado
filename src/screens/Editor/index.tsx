import React, { useCallback, useRef, useState } from 'react'
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import AntIcon from 'react-native-vector-icons/AntDesign'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import { WebView } from 'react-native-webview'
import uuid from 'react-native-uuid-generator'

import { FormatButton } from '../../components'
import { RootStackParamList } from '../../types'
import { editorHtml } from '../../utils/editor'
import { actionSaveNote, useActionDispatch } from '../../store'
import { theme } from '../../utils/theme'

type EditorScreenNavigationProp = NavigationProp<RootStackParamList, 'Editor'>
type EditorScreenRouteProp = RouteProp<RootStackParamList, 'Editor'>

export const EditorScreen: React.FC = () => {
  const navigation = useNavigation<EditorScreenNavigationProp>()
  const { params } = useRoute<EditorScreenRouteProp>()
  const [note, setNote] = useState(params?.note)
  const [title, setTitle] = useState(note ? note.title : '')
  const [content, setContent] = useState(note ? note.content : '')
  const [isEditingNote, setIsEditingNote] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const editorRef = useRef<WebView>()
  const dispatch = useActionDispatch()

  const executeJS = useCallback((code: string) => {
    editorRef.current.injectJavaScript(code)
  }, [])

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.secondary} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntIcon name="arrowleft" size={25} color={theme.primary} />
          </TouchableOpacity>
          <View style={styles.actionButtonsContainer}>
            {isDirty && (
              <TouchableOpacity
                onPress={async () => {
                  const newNote = { ...note, title, content }

                  if (!note) {
                    newNote.id = await uuid.getRandomUUID()
                  }

                  await dispatch(actionSaveNote(newNote))

                  setNote(newNote)

                  setIsDirty(false)

                  Keyboard.dismiss()
                  setIsEditingNote(false)
                  executeJS('editor.blur()')
                }}
                style={styles.actionButton}
              >
                <FontAwesomeIcon solid name="save" size={24} color={theme.primary} />
              </TouchableOpacity>
            )}
            {isEditingNote && (
              <TouchableOpacity
                onPress={async () => {
                  Keyboard.dismiss()
                  setIsEditingNote(false)
                  executeJS('editor.blur()')
                }}
                style={styles.actionButton}
              >
                <AntIcon name="check" size={25} color={theme.primary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TextInput
          style={styles.title}
          value={title}
          onFocus={() => setIsEditingNote(true)}
          onChangeText={text => {
            setTitle(text)
            setIsDirty(true)
          }}
          placeholder="Note title"
        />
        <WebView
          ref={editorRef}
          source={{ html: editorHtml }}
          onLoadEnd={() => {
            executeJS(`editor.innerHTML = "${content}"`)
            executeJS(`editor.style.color = "${theme.primary}"`)
          }}
          onMessage={event => {
            if (event.nativeEvent.data === 'edit-start') {
              setIsEditingNote(true)
              return
            }

            if (event.nativeEvent.data === 'edit-stop') {
              return
            }

            setContent(event.nativeEvent.data)
            setIsDirty(true)
            setIsEditingNote(true)
          }}
          style={styles.editor}
        />
        {isEditingNote && (
          <View style={styles.formatToolbar}>
            <ScrollView horizontal style={styles.formatButtons}>
              <FormatButton name="align-left" color={theme.primary} />
              <FormatButton name="align-center" color={theme.primary} />
              <FormatButton name="align-right" color={theme.primary} />
              <FormatButton name="align-justify" color={theme.primary} />
              <FormatButton name="bold" color={theme.primary} />
              <FormatButton name="underline" color={theme.primary} />
              <FormatButton name="italic" color={theme.primary} />
              <FormatButton name="list-ul" color={theme.primary} />
              <FormatButton name="list-ol" color={theme.primary} />
              <FormatButton name="link" color={theme.primary} />
            </ScrollView>
          </View>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.secondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: Dimensions.get('window').width,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    paddingHorizontal: 20,
    width: Dimensions.get('window').width,
    color: theme.primary,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 20,
  },
  editor: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: theme.secondary,
  },
  formatToolbar: {
    height: 60,
  },
  formatButtons: {
    backgroundColor: theme.secondary,
  },
})
