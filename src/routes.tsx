import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import LoginPage from './auth/LoginPage'
import ErrorPage from './components/ErrorPage'
import Layout from './components/Layout'
import Royalties from './feature/royalties/Royalties'
import ImportRoyalties from './feature/import'
import Reports from './feature/reports/Reports'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Route path="/" element={<Layout />} errorElement={<ErrorPage />} /> */}
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<Royalties />} />
        {/* <Route
          path="royalties"
          element={<Royalties />}
          errorElement={<ErrorPage />}
        /> */}
        <Route
          path="import"
          element={<ImportRoyalties />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="reports"
          element={<Reports />}
          errorElement={<ErrorPage />}
        />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </>,
  ),
)

export default router
