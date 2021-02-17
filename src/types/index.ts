export interface Note {
  id: string
  title: string
  content: string
}

export type RootStackParamList = {
  Home: undefined
  Editor: { note: Note }
}
