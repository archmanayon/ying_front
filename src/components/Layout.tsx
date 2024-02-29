import { Navigate, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import PageHeader from './PageHeader'
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
    <div>
      <Navbar />
      <PageHeader />

      <main className="h-full py-5 lg:pl-52">
        <div className="h-full px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
