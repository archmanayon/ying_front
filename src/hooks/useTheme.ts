import useLocalStorage from 'react-use-localstorage'

type Theme = 'light' | 'dark' | 'system'

const useTheme = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  const isDarkTheme =
    theme !== 'light' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches

  // On page load or when changing themes, best to add inline in  `head` to avoid FOUC
  const setAppTheme = () => {
    if (theme === 'dark' || isDarkTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    document.documentElement.classList.add('h-full')
    document.documentElement.classList.add('bg-gray-100')
    // const backgroundColor = isDarkTheme ? 'bg-gray-800' : 'bg-white'
    // document.documentElement.classList.add(backgroundColor)
    document.body.classList.add('h-full')
  }

  const changeTheme = (theme: Theme) => {
    if (theme === 'system') localStorage.removeItem('theme')

    setTheme(theme)
  }

  return {
    setAppTheme,
    changeTheme,
    theme,
    isDarkTheme,
  }
}

export default useTheme
