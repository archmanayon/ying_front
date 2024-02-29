import { CACHE_KEY_BOOK_SALES, CACHE_KEY_IMPORT } from '@/constants'
import APIClient from '@/api/client'
import { defaultFunction } from '@/constants'
import useAppMutation from './useAppMutation'

const apiClient = new APIClient<
  Record<string, string | number | undefined>[],
  any
>('/publishing')

const useImport = (onDone = defaultFunction) => {
  // TODO: Add types / get types from backend response
  return useAppMutation<any, Error>(
    CACHE_KEY_IMPORT,
    CACHE_KEY_BOOK_SALES,
    apiClient.post,
    onDone,
  )
}

export default useImport
