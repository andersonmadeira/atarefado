import React, { useState } from 'react'
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { RootStackParamList } from '../types'
import { FabButton } from '../../components'

const windowSize = Dimensions.get('window')

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

export const HomeScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigation = useNavigation<HomeScreenNavigationProp>()

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
              <View style={styles.contentColumn}>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('Editor', { noteId: 'idhere' })}
                >
                  <View style={styles.card}>
                    <Text style={styles.cardContent}>Something here</Text>
                  </View>
                </TouchableWithoutFeedback>
                <View style={styles.card}>
                  <Text style={styles.cardContent}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. consectetur
                    adipisicing elit.
                  </Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardContent}>
                    Magni ipsam, provident explicabo facilis nihil doloremque.
                  </Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardContent}>
                    vel quisquam, esse quidem quae ea dolorum aut corrupt
                  </Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardContent}>Something here</Text>
                </View>
              </View>
              <View style={styles.contentColumn}>
                <View style={styles.card}>
                  <Text style={styles.cardContent}>
                    Magni ipsam, provident explicabo facilis nihil doloremque.
                  </Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardContent}>Something here</Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardContent}>
                    vel quisquam, esse quidem quae ea dolorum aut corrupt
                  </Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardContent}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. consectetur
                    adipisicing elit.
                  </Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardContent}>
                    Magni ipsam, provident explicabo facilis nihil doloremque.
                  </Text>
                </View>
              </View>
            </View>
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
  card: {
    color: '#777777',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 5,
  },
  cardContent: {
    fontSize: 15,
  },
})
