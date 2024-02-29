import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import LoginPage from './auth/LoginPage'
import ErrorPage from './components/ErrorPage'
import Layout from './components/Layout'
import BookSales from './feature/book-sales/BookSales'
import XlsxImport from './feature/import/XlsxImport'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Route path="/" element={<Layout />} errorElement={<ErrorPage />} /> */}
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<BookSales />} />
        <Route
          path="sales"
          element={<BookSales />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="import"
          element={<XlsxImport />}
          errorElement={<ErrorPage />}
        />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </>,
  ),
)

export default router
