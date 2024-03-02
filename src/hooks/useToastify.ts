import { toast } from 'react-toastify'

const useToastify = () => {
  const showMessage = (
    toastFunction: typeof toast.error,
    message: string,
    toastId?: string,
  ) => {
    toastFunction(message, {
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
      position: 'top-center',
      toastId,
    })
  }
  const toastError = (message: string, toastId?: string) =>
    showMessage(toast.error, message, toastId)
  const toastSuccess = (message: string, toastId?: string) =>
    showMessage(toast.success, message, toastId)
  const toastWarning = (message: string, toastId?: string) =>
    showMessage(toast.warn, message, toastId)
  const toastInfo = (message: string, toastId?: string) =>
    showMessage(toast.info, message, toastId)

  return {
    toastError,
    toastSuccess,
    toastWarning,
    toastInfo,
  }
}

export default useToastify
