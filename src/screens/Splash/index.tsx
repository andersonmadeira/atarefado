import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Animated, StyleSheet, View, Easing } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { RootStackParamList } from '../../types'
import { actionFetchNotes } from '../../store'

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>

export const SplashScreen: React.FC = () => {
  const spinValue = useRef(new Animated.Value(0))
  const navigation = useNavigation<SplashScreenNavigationProp>()
  const [isLoading, setIsLoading] = useState(true)

  const spin = useCallback(() => {
    spinValue.current.setValue(0)

    Animated.timing(spinValue.current, {
      toValue: 1,
      duration: 700,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => spin())
  }, [])

  useEffect(() => {
    const init = async () => {
      await actionFetchNotes()
      setIsLoading(false)
    }

    spin()

    init()
  }, [spin])

  useEffect(() => {
    if (!isLoading) {
      navigation.navigate('Home')
    }
  }, [isLoading, navigation])

  const spinAngle = spinValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  console.log(spinAngle)

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spinAngle }] }}>
        <Icon name="loading1" size={32} color="#111" />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
