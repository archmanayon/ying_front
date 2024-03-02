import { cn } from '@/helpers'
import useNavbarStore from '@/store/navbarStore'
import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {
  item: {
    name: string
    to: string
    icon?: React.ElementType
  }
  activeClass?: string
  inactiveClass?: string
  className?: string
}

const NavbarLink = ({ item, activeClass, inactiveClass, className }: Props) => {
  const setSidebarOpen = useNavbarStore((store) => store.setSidebarOpen)

  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        cn(isActive ? activeClass ?? '' : inactiveClass ?? '', className ?? '')
      }
      onClick={() => setSidebarOpen(false)}
    >
      {item.icon && (
        <item.icon className="mr-1 h-6 w-6 shrink-0" aria-hidden="true" />
      )}
      {item.name}
    </NavLink>
  )
}

export default NavbarLink
