import { useQuery } from '@tanstack/react-query'
import { CACHE_KEY_BOOK_SALES } from '../constants'
import APIClient from '@/api/client'
import { Row } from './useImport'

const apiClient = new APIClient<Row[]>('/royalty')

const useRoyalties = () => {
  return useQuery<Row[], Error>({
    queryKey: CACHE_KEY_BOOK_SALES,
    queryFn: () => apiClient.get(),
    staleTime: 1_000 * 60 * 60, // 1 hour
  })
}

export default useRoyalties
