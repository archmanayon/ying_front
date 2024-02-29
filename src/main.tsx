import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import router from './routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
// import { GoogleOAuthProvider } from '@react-oauth/google'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <GoogleOAuthProvider clientId={clientId ?? ''}> */}
      <ToastContainer />
      <RouterProvider router={router} />
      <ReactQueryDevtools />
      {/* </GoogleOAuthProvider> */}
    </QueryClientProvider>
  </React.StrictMode>,
)
