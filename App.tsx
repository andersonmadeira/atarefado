import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Card = styled.View`
  color: #777777;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 10px 20px;
`

const CardContent = styled.Text`
  font-size: 20px;
`

const MainContent = styled.View`
  margin: 10px 20px;
`

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #ededed;
  border-radius: 15px;
  margin-bottom: 15px;
  padding: 0px 15px;
`

const SearchInput = styled.TextInput`
  flex: 1;
  padding-left: 10px;
  font-size: 15px;
`

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')

  console.log('searchTerm', searchTerm)

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F7F7" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <MainContent>
            <SearchContainer>
              <Icon name="search" size={15} color="#999" />
              <SearchInput
                placeholder="Procurar anotações"
                value={searchTerm}
                onChangeText={text => setSearchTerm(text)}
              />
              {searchTerm !== '' && (
                <TouchableOpacity onPress={() => setSearchTerm('')} style={styles.clearButton}>
                  <Icon name="times" size={15} color="#999" />
                </TouchableOpacity>
              )}
            </SearchContainer>
            <Card>
              <CardContent>Something here</CardContent>
            </Card>
            <Card>
              <CardContent>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</CardContent>
            </Card>
            <Card>
              <CardContent>Magni ipsam, provident explicabo facilis nihil doloremque.</CardContent>
            </Card>
            <Card>
              <CardContent>vel quisquam, esse quidem quae ea dolorum aut corrupt</CardContent>
            </Card>
          </MainContent>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F7F7F7',
  },
  clearButton: {
    padding: 8,
    marginRight: -4,
  },
})

export default App
