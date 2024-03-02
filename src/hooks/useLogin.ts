import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CACHE_KEY_LOGIN_USER, defaultFunction } from '../constants'
import APIClient from '@/api/client'
import useAuthStore from '../store/authStore'

export type AuthenticationData = {
  token: string
  user: {
    name: string
    email: string
  }
}

export type LoginData = {
  email: string
  password: string
}

const apiClient = new APIClient<LoginData, AuthenticationData>('/login')

const useLogin = (onLogin = defaultFunction) => {
  const queryClient = useQueryClient()
  const { setAuth, reset } = useAuthStore((store) => ({
    setAuth: store.setAuth,
    reset: store.reset,
  }))

  return useMutation<
    AuthenticationData,
    Error & { response: { data: { detail: string } } },
    LoginData,
    AuthenticationData
  >({
    mutationFn: apiClient.post,

    onMutate: () => {
      const prevCredentials =
        queryClient.getQueryData<AuthenticationData>(CACHE_KEY_LOGIN_USER) ||
        ({} as AuthenticationData)

      queryClient.setQueryData<AuthenticationData>(
        CACHE_KEY_LOGIN_USER,
        (credentials) => credentials,
      )

      return prevCredentials
    },

    onSuccess: (returnedData) => {
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_LOGIN_USER })

      onLogin()

      setAuth({
        token: returnedData.token,
        name: returnedData.user.name,
        email: returnedData.user.email,
      })
    },

    onError: reset,
  })
}

export default useLogin
