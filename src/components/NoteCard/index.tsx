import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'

export interface NoteCardProps {
  title: string
  text: string
  onPress?: () => void
}

export const NoteCard: React.FC<NoteCardProps> = ({ title, text, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPress && onPress()}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    color: '#777777',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 5,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
  },
  content: {
    fontSize: 15,
  },
})
