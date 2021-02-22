export interface Note {
  id: string
  title: string
  content: string
}

export type RootStackParamList = {
  Splash: undefined
  Home: undefined
  Editor: { note: Note } | undefined
}
