import { useEffect } from 'react'
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom'
import useTheme from '../hooks/useTheme'

const ErrorPage = () => {
  const { theme, setAppTheme } = useTheme()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useRouteError() as any
  // Partial<{
  //   message: string
  //   response: { status: number }
  //   satus: number
  //   statusText: string
  //   data: Record<string, unknown>
  // }>

  useEffect(() => setAppTheme(), [theme, setAppTheme])

  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col items-center justify-center">
      {isRouteErrorResponse(error) ? (
        <>
          <h1 className="text-primary text-6xl font-bold">{error?.status}</h1>
          <p className="text-secondary mt-2">{error.statusText}</p>
        </>
      ) : (
        <>
          <h1 className="text-primary text-6xl font-bold">{error?.status}</h1>

          {error.statusText && (
            <p className="text-secondary mt-2">{error.statusText}</p>
          )}
          {error.message && (
            <p className="text-secondary mt-2">{error.message}</p>
          )}
        </>
      )}
      <div className="mt-4 flex justify-center gap-2">
        {error.data?.back && <button onClick={() => navigate(-1)}>Back</button>}
        <button className="button info" onClick={() => navigate('/')}>
          Home
        </button>
      </div>
    </div>
  )
}

export default ErrorPage
