import { useEffect } from 'react'

const usePageTitle = (pageTitle: string) => {
  const appName = import.meta.env.VITE_APP_NAME

  useEffect(() => {
    document.title = `${pageTitle} | ${appName}`
  }, [appName, pageTitle])
}

export default usePageTitle
