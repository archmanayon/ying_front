import { create } from 'zustand'

type DropDownData = {
  authors: string[]
  setAuthors: (data: Set<string>) => void
  selectedAuthor: string
  setSelectedAuthor: (data: string) => void
}

const useDropdownStore = create<DropDownData>((set) => ({
  authors: [],
  setAuthors: (data) => set({ authors: [...data] }),
  //same ra pero gamit ug function to get authors
  //   setAuthors: (data) => set(() => ({ authors: data })),
  selectedAuthor: '',
  setSelectedAuthor: (data) => set({ selectedAuthor: data }),
}))

export default useDropdownStore
