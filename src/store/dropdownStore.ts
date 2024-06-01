import { create } from 'zustand'

type DropDownData = {
  authors?: string[]
  setAuthors: (data: Set<string>) => void
  selectedAuthor?: string | undefined
  setSelectedAuthor: (data: string | undefined) => void

  bookTitles?: string[]
  setBookTitles: (data: Set<string>) => void
  selectedTitle?: string | undefined
  setSelectedTitle: (data: string) => void

  reportDates?: string[]
  setReportDates: (data: Set<string>) => void
  selectedReportDate?: string | undefined
  setSelectedReportDate: (data: string) => void
}

const useDropdownStore = create<DropDownData>((set) => ({
  authors: [],
  setAuthors: (data) => set({ authors: [...data] }),
  selectedAuthor: '',
  setSelectedAuthor: (data) => set({ selectedAuthor: data }),

  bookTitles: [],
  setBookTitles: (data) => set({ bookTitles: [...data] }),
  selectedTitle: '',
  setSelectedTitle: (data) => set({ selectedTitle: data }),

  reportDates: [],
  setReportDates: (data) => set({ reportDates: [...data] }),
  selectedReportDate: '',
  setSelectedReportDate: (data) => set({ selectedReportDate: data }),
}))

export default useDropdownStore
