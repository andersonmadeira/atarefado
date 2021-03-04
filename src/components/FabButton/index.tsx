import React, { useRef } from 'react'
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { theme } from '../../utils/theme'

function getButtonAnimatedStyle(animationValue: Animated.Value, index: number) {
  return {
    transform: [
      { scale: animationValue },
      {
        translateY: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -60 * (index + 1)],
        }),
      },
    ],
  }
}

export interface FabButtonProps {
  buttons: { icon: JSX.Element; action: () => void }[]
}

export const FabButton: React.FC<FabButtonProps> = ({ buttons }) => {
  const isOpen = useRef(false)
  const animation = useRef(new Animated.Value(0))

  const toggleMenu = () => {
    const toValue = isOpen.current ? 0 : 1

    Animated.spring(animation.current, {
      toValue,
      friction: 6,
      useNativeDriver: false,
    }).start()

    isOpen.current = !isOpen.current
  }

  const rotationStyle = {
    transform: [
      {
        rotate: animation.current.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  }

  return (
    <View style={styles.container}>
      {buttons.map((def, i) => {
        const buttonStyle = getButtonAnimatedStyle(animation.current, i)

        return (
          <TouchableWithoutFeedback
            key={i}
            onPress={() => {
              toggleMenu()
              def.action()
            }}
          >
            <Animated.View style={[styles.button, styles.childButton, buttonStyle]}>
              {def.icon}
            </Animated.View>
          </TouchableWithoutFeedback>
        )
      })}
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View style={[styles.button, rotationStyle]}>
          <Icon name="plus" size={30} color="#fff" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 90,
    right: 60,
  },
  button: {
    position: 'absolute',
    backgroundColor: theme.primary,
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
  childButton: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: theme.primaryDark,
    shadowColor: theme.primaryDark,
  },
})
