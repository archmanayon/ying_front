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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Route path="/" element={<Layout />} errorElement={<ErrorPage />} /> */}
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<Royalties />} />
        <Route
          path="book-sales"
          element={<Royalties />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="import"
          element={<ImportRoyalties />}
          errorElement={<ErrorPage />}
        />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </>,
  ),
)

export default router
