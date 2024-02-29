import {
  MutationFunction,
  QueryKey,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import useToastify from './useToastify'
import { defaultFunction } from '@/constants'

const useAppMutation = <Tdata, Terror>(
  queryCacheKey: QueryKey,
  indexCacheKey: QueryKey,
  mutationFunction: MutationFunction<Tdata, Tdata>,
  onDone: typeof defaultFunction,
) => {
  const queryClient = useQueryClient()
  const { toastError } = useToastify()

  return useMutation<
    Tdata,
    Terror & { response: { data: { detail: string } } },
    Tdata
  >({
    mutationFn: mutationFunction,

    onMutate: () => {
      const prevData =
        queryClient.getQueryData<any>(queryCacheKey) || ({} as any)

      queryClient.setQueryData<any>(
        queryCacheKey,
        (credentials: any) => credentials,
      )

      return prevData
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: indexCacheKey })

      onDone()
    },

    onError: () => toastError('Error occurred while processing the data.'),
  })
}

export default useAppMutation
