import React, { useState } from 'react'
import {
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { FabButton } from '../../components'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../types'

interface ResizableProps {
  windowSize: {
    width: number
    height: number
  }
}

const Content = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`

const ContentColumnRaw = styled.View<ResizableProps>`
  flex: 0 ${props => Math.ceil(props.windowSize.width) / 2 - 20}px;
`

const Card = styled.View`
  color: #777777;
  background-color: #fff;
  border-radius: 15px;
  padding: 10px 20px;
  margin: 5px;
`

const CardContent = styled.Text`
  font-size: 15px;
`

const Main = styled.View`
  flex: 1;
`

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #ededed;
  border-radius: 25px;
  margin: 15px;
  padding: 0px 15px;
`

const SearchInput = styled.TextInput`
  flex: 1;
  padding-left: 10px;
  font-size: 15px;
`

const ContentColumn: React.FC = ({ children }) => {
  const { width, height } = useWindowDimensions()

  return <ContentColumnRaw windowSize={{ width, height }}>{children}</ContentColumnRaw>
}

const AppScrollView = styled.ScrollView`
  height: 100%;
  background-color: #f7f7f7;
`

const ClearButton = styled.TouchableOpacity`
  padding: 8px;
  margin-right: -4px;
`

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

export const HomeScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigation = useNavigation<HomeScreenNavigationProp>()

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F7F7" />
      <SafeAreaView>
        <AppScrollView>
          <Main>
            <SearchContainer>
              <Icon name="search" size={15} color="#999" />
              <SearchInput
                placeholder="Procurar anotações"
                value={searchTerm}
                onChangeText={text => setSearchTerm(text)}
              />
              {searchTerm !== '' && (
                <ClearButton onPress={() => setSearchTerm('')}>
                  <Icon name="times" size={15} color="#999" />
                </ClearButton>
              )}
            </SearchContainer>
            <Content>
              <ContentColumn>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('Editor', { noteId: 'idhere' })}
                >
                  <Card>
                    <CardContent>Something here</CardContent>
                  </Card>
                </TouchableWithoutFeedback>
                <Card>
                  <CardContent>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. consectetur
                    adipisicing elit.
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    Magni ipsam, provident explicabo facilis nihil doloremque.
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>vel quisquam, esse quidem quae ea dolorum aut corrupt</CardContent>
                </Card>
                <Card>
                  <CardContent>Something here</CardContent>
                </Card>
              </ContentColumn>
              <ContentColumn>
                <Card>
                  <CardContent>
                    Magni ipsam, provident explicabo facilis nihil doloremque.
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>Something here</CardContent>
                </Card>
                <Card>
                  <CardContent>vel quisquam, esse quidem quae ea dolorum aut corrupt</CardContent>
                </Card>
                <Card>
                  <CardContent>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. consectetur
                    adipisicing elit.
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    Magni ipsam, provident explicabo facilis nihil doloremque.
                  </CardContent>
                </Card>
              </ContentColumn>
            </Content>
          </Main>
        </AppScrollView>
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
