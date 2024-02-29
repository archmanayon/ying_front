import { cn } from '@/helpers'
import useNavbarStore from '@/store/navbarStore'
import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {
  item: {
    name: string
    to: string
    icon: React.ElementType
  }
}

const NavbarLink = ({ item }: Props) => {
  const setSidebarOpen = useNavbarStore((store) => store.setSidebarOpen)

  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        cn(
          isActive
            ? 'bg-gray-800 text-white'
            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
        )
      }
      onClick={() => setSidebarOpen(false)}
    >
      <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
      {item.name}
    </NavLink>
  )
}

export default NavbarLink
