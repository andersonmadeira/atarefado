import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { RootStackParamList } from '../types'
import { WebView } from 'react-native-webview'
import { ScrollView } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

export const FormatButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
  padding: 10px;
  width: 60px;
  height: 60px;
`

type EditorScreenRouteProp = RouteProp<RootStackParamList, 'Editor'>

export const EditorScreen: React.FC = () => {
  const {
    params: { noteId },
  } = useRoute<EditorScreenRouteProp>()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Editor Screen</Text>
      <Text>Note: {noteId}</Text>
      <WebView
        startInLoadingState={true}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          backgroundColor: '#f7f7f7',
        }}
        // source={{ uri: 'https://google.com/' }}
        source={{ html: '<div contentEditable="true">Hello <b>world</b></div>' }}
      />
      <View style={{ height: 60 }}>
        <ScrollView horizontal style={{ backgroundColor: '#f7f7f7' }}>
          <FormatButton>
            <Icon name="align-left" size={30} color="#a1a1a1" />
          </FormatButton>
          <FormatButton>
            <Icon name="align-center" size={30} color="#a1a1a1" />
          </FormatButton>
          <FormatButton>
            <Icon name="align-right" size={30} color="#a1a1a1" />
          </FormatButton>
          <FormatButton>
            <Icon name="align-justify" size={30} color="#a1a1a1" />
          </FormatButton>
          <FormatButton>
            <Icon name="bold" size={30} color="#a1a1a1" />
          </FormatButton>
          <FormatButton>
            <Icon name="underline" size={30} color="#a1a1a1" />
          </FormatButton>
          <FormatButton>
            <Icon name="italic" size={30} color="#a1a1a1" />
          </FormatButton>
          <FormatButton>
            <Icon name="list-ul" size={30} color="#a1a1a1" />
          </FormatButton>
          <FormatButton>
            <Icon name="list-ol" size={30} color="#a1a1a1" />
          </FormatButton>
          <FormatButton>
            <Icon name="link" size={30} color="#a1a1a1" />
          </FormatButton>
        </ScrollView>
      </View>
    </View>
  )
}
