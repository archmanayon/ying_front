import { ReactNode } from 'react'
import { toast, ToastOptions } from 'react-toastify'

const useToastify = (options: ToastOptions = {}) => {
  const showMessage = (
    toastFunction: typeof toast.error,
    message: ReactNode,
    toastId?: string,
  ) => {
    toastFunction(message, {
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
      position: 'top-center',
      toastId,
      autoClose: options.autoClose,
    })
  }
  const toastError = (message: ReactNode, toastId?: string) =>
    showMessage(toast.error, message, toastId)
  const toastSuccess = (message: ReactNode, toastId?: string) =>
    showMessage(toast.success, message, toastId)
  const toastWarning = (message: ReactNode, toastId?: string) =>
    showMessage(toast.warn, message, toastId)
  const toastInfo = (message: ReactNode, toastId?: string) =>
    showMessage(toast.info, message, toastId)

  const clear = () => toast.dismiss()

  return {
    toastError,
    toastSuccess,
    toastWarning,
    toastInfo,
    clear,
  }
}

export default useToastify
