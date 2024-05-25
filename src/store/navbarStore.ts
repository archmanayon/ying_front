import { create } from 'zustand'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'
import { CommandLineIcon } from '@heroicons/react/24/outline'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import AssessmentIcon from '@mui/icons-material/Assessment'
import useAuthStore from './authStore'

export type Option = {
  name: string
  to: string
  icon?: typeof PhoneInTalkIcon | typeof CommandLineIcon
  current?: boolean
  subMenu?: Option[]
  adminOnly?: boolean
  command?: () => void
}

type NavigationOptionsStore = {
  options: Option[]
  userOptions: Option[]
  sidebarOpen: boolean
  setSidebarOpen: (value: boolean) => void
}

const useNavbarStore = create<NavigationOptionsStore>((set) => ({
  options: [
    {
      name: 'Royalties',
      to: '/',
      icon: MenuBookIcon,
      current: true,
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
    },
    {
      name: 'Reports',
      to: '/reports',
      icon: AssessmentIcon,
      current: false,
    },
    {
      name: 'Authors',
      to: '/authorList',
      icon: MenuBookIcon,
      current: true,
      // For reference, when creating sub menus
      // subMenu: [
      //   { name: 'Agent Builder', to: '/agents' },
      //   { name: 'Widget Builder', to: '/widgets' },
      // ],
    },
  ],
  userOptions: [
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
