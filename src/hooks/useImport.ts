import { CACHE_KEY_BOOK_SALES, CACHE_KEY_IMPORT } from '@/constants'
import APIClient from '@/api/client'
import { defaultFunction } from '@/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export type Row = Record<string, string | number | boolean | undefined>
export type ImportData = Row[]
export type ImportResponse = { duplicates: number[]; imported: number }

const apiClient = new APIClient<ImportData, ImportResponse>('/royalty')

const useLogin = (onDone: (r: ImportResponse) => void = defaultFunction) => {
  const queryClient = useQueryClient()

  return useMutation<
    ImportResponse,
    Error & { response: { data: { detail: string } } },
    ImportData,
    ImportResponse
  >({
    mutationFn: apiClient.post,

    onMutate: () => {
      const prevCredentials =
        queryClient.getQueryData<ImportResponse>(CACHE_KEY_IMPORT) ||
        ({} as ImportResponse)

      queryClient.setQueryData<ImportResponse>(CACHE_KEY_IMPORT, (data) => data)

      return prevCredentials
    },

    onSuccess: (returnedData) => {
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_IMPORT })
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_BOOK_SALES })

      onDone(returnedData)
    },

    onError: () => console.log('Error occurred while processing the data.'),
  })
}

export default useLogin
