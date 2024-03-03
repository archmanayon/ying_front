import { cn } from '@/helpers'
import useNavbarStore, { Option } from '@/store/navbarStore'
import { NavLink } from 'react-router-dom'

type Props = {
  item: Option
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
      onClick={() => {
        setSidebarOpen(false)
        if (item.command) item.command()
      }}
      aria-current={item.current ? 'page' : undefined}
    >
      {item.icon && (
        <item.icon className="mr-1 h-6 w-6 shrink-0" aria-hidden="true" />
      )}
      {item.name}
    </NavLink>
  )
}

export default NavbarLink
