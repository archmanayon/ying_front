import axios from 'axios'
import useAuthStore from '../store/authStore'
import useToastify from '@/hooks/useToastify'
// import useToastify from '../hooks/useToastify'

const baseURL = import.meta.env.VITE_BASE_URL + '/api' ?? 'http://localhost/api'

export const axiosInstance = axios.create({
  baseURL,
  // withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response && error?.response?.status === 401) {
      useAuthStore.getState().reset()
      console.log('401')
    }

    const message = error?.response?.data?.message || error.message

    useToastify().toastError(message)
    return Promise.reject(error)
  },
)

class APIClient<T, U = unknown> {
  endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  get = async (id?: string) => {
    const res = await axiosInstance.get<T>(
      `${this.endpoint}${id?.length ? '/' + id : ''}`,
    )
    return res.data
  }

  post = async (data: T, id?: string) => {
    const res = await axiosInstance.post<U>(
      `${this.endpoint}${id?.length ? '/' + id : ''}`,
      data,
    )
    return res.data
  }

  put = async (data: T, id?: string) => {
    const res = await axiosInstance.put<U>(
      `${this.endpoint}${id?.length ? '/' + id : ''}`,
      data,
    )
    return res.data
  }

  delete = async (id: T) => {
    const res = await axiosInstance.delete<U>(`${this.endpoint}/${id}`)
    return res.data
  }
}

export default APIClient
