import { create } from 'zustand'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'
import { CommandLineIcon } from '@heroicons/react/24/outline'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import useAuthStore from './authStore'

export type NavigationOption = {
  name: string
  to: string
  icon: typeof PhoneInTalkIcon | typeof CommandLineIcon
  current: boolean
  subMenu?: Option[]
  adminOnly?: boolean
}

export type Option = {
  name: string
  to: string
  command?: () => void
}

type NavigationOptionsStore = {
  options: NavigationOption[]
  userOptions: Option[]
  sidebarOpen: boolean
  setSidebarOpen: (value: boolean) => void
}

const useNavbarStore = create<NavigationOptionsStore>((set) => ({
  options: [
    {
      name: 'Book Sales',
      to: '/book-sales',
      icon: MenuBookIcon,
      current: true,
      title: 'Book Sales',
      // For reference, when creating sub menus
      // subMenu: [
      //   { name: 'Agent Builder', to: '/agents' },
      //   { name: 'Widget Builder', to: '/widgets' },
      // ],
    },
    {
      name: 'Import',
      to: '/import',
      icon: UploadFileIcon,
      current: false,
      title: 'Royalties Import',
    },
  ],
  userOptions: [
    { name: 'Your profile', to: '/' },
    {
      name: 'Sign out',
      to: '/login',
      command: () => useAuthStore.getState().reset(),
    },
  ],
  sidebarOpen: false,
  setSidebarOpen: (value: boolean) => set(() => ({ sidebarOpen: value })),
}))

export default useNavbarStore
