import { Navigate, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import useTheme from '../hooks/useTheme'
import useAuthStore from '../store/authStore'

const Layout = () => {
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated)
  const { setAppTheme } = useTheme()

  useEffect(() => {
    setAppTheme()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isAuthenticated) return <Navigate to="/login" />

  return (
    <div className="min-h-full">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout
