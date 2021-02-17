import React, { useCallback, useRef, useState } from 'react'
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { WebView } from 'react-native-webview'

import { FormatButton } from '../../components'
import { RootStackParamList } from '../types'
import { editorHtml } from './util'

type EditorScreenNavigationProp = NavigationProp<RootStackParamList, 'Editor'>
type EditorScreenRouteProp = RouteProp<RootStackParamList, 'Editor'>

export const EditorScreen: React.FC = () => {
  const navigation = useNavigation<EditorScreenNavigationProp>()
  const {
    params: { note },
  } = useRoute<EditorScreenRouteProp>()
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [isEditingNote, setIsEditingNote] = useState(false)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const editorRef = useRef<WebView>()

  const executeJS = useCallback((code: string) => {
    editorRef.current.injectJavaScript(code)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntIcon name="arrowleft" size={25} color="#444" />
        </TouchableOpacity>
        {(isEditingNote || isEditingTitle) && (
          <TouchableOpacity
            onPress={() => {
              if (isEditingTitle) {
                Keyboard.dismiss()
              } else {
                executeJS('editor.blur()')
              }

              setIsEditingTitle(false)
              setIsEditingNote(false)
            }}
          >
            <AntIcon name="check" size={25} color="#444" />
          </TouchableOpacity>
        )}
      </View>
      <TextInput
        style={styles.title}
        value={title}
        onFocus={() => setIsEditingTitle(true)}
        onChangeText={text => setTitle(text)}
        placeholder="Note title"
      />
      <WebView
        ref={editorRef}
        source={{ html: editorHtml }}
        onLoadEnd={() => executeJS(`editor.innerHTML = "${content}"`)}
        onMessage={event => {
          if (event.nativeEvent.data === 'edit-start') {
            setIsEditingNote(true)
          }
          if (event.nativeEvent.data === 'edit-stop') {
            setIsEditingNote(false)
          }
        }}
        style={styles.editor}
      />
      {isEditingNote && (
        <View style={styles.formatToolbar}>
          <ScrollView horizontal style={styles.formatButtons}>
            <FormatButton name="align-left" />
            <FormatButton name="align-center" />
            <FormatButton name="align-right" />
            <FormatButton name="align-justify" />
            <FormatButton name="bold" />
            <FormatButton name="underline" />
            <FormatButton name="italic" />
            <FormatButton name="list-ul" />
            <FormatButton name="list-ol" />
            <FormatButton name="link" />
          </ScrollView>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
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
  },
  editor: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#f7f7f7',
  },
  formatToolbar: {
    height: 60,
  },
  formatButtons: {
    backgroundColor: '#f7f7f7',
  },
})
