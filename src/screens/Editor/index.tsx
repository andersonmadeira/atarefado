import React from 'react'
import { Text, View } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'

import { RootStackParamList } from '../types'

type EditorScreenRouteProp = RouteProp<RootStackParamList, 'Editor'>

export const EditorScreen: React.FC = () => {
  const {
    params: { noteId },
  } = useRoute<EditorScreenRouteProp>()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Editor Screen</Text>
      <Text>Note: {noteId}</Text>
    </View>
  )
}
