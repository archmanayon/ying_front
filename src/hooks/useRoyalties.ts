import { useQuery } from '@tanstack/react-query'
import { CACHE_KEY_BOOK_SALES } from '../constants'
import APIClient from '@/api/client'

const apiClient = new APIClient<any>('/royalty')

const useRoyalties = () => {
  return useQuery<any, Error>({
    queryKey: CACHE_KEY_BOOK_SALES,
    queryFn: () => apiClient.get(),
    staleTime: 1_000 * 60 * 60, // 1 hour
  })
}

export default useRoyalties
