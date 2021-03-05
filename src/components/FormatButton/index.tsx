import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { IconProps } from 'react-native-vector-icons/Icon'
import { theme } from '../../utils/theme'

/**
 * FontAwesome5 icon buttons
 */
export const FormatButton: React.FC<IconProps> = ({ name, color }) => {
  return (
    <TouchableOpacity style={styles.formatButton}>
      <Icon name={name} size={20} color={color || '#111'} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  formatButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.secondary,
    padding: 10,
    width: 60,
    height: 60,
  },
})
