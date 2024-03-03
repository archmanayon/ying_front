import { create, StateCreator } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { AUTH_KEY } from '../constants'

export type AuthData = {
  name: string
  email: string
  token: string
}

type AuthStore = AuthData & {
  setAuth: (data: AuthData) => void
  reset: () => void
  isAuthenticated: boolean
}

type PersistType = (
  config: StateCreator<AuthStore>,
  options: PersistOptions<AuthStore>,
) => StateCreator<AuthStore>

const initialState: AuthData = {
  name: '',
  email: '',
  token: '',
}

const useAuthStore = create<AuthStore>(
  (persist as PersistType)(
    (set, get) => ({
      ...initialState,
      setAuth: (data) =>
        set({
          ...data,
          isAuthenticated: true,
        }),
      reset: () => set({ ...initialState, isAuthenticated: false }),
      isAuthenticated: get()?.isAuthenticated ?? false,
    }),
    { name: AUTH_KEY },
  ),
)

if (process.env.NODE_ENV === 'development')
  mountStoreDevtool(AUTH_KEY + '-store', useAuthStore)

export default useAuthStore
