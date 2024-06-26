import { Button, Dialog, DialogDismiss, DialogHeading } from '@ariakit/react'

type Props = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  message: string
  confirmLabel?: string
}

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  message,
  confirmLabel = 'OK',
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      getPersistentElements={() => document.querySelectorAll('.Toastify')}
      backdrop={<div className="backdrop" />}
      className="dialog"
    >
      <DialogHeading className="heading">Confirm</DialogHeading>
      <p className="description">{message}</p>
      <div className="buttons flex justify-end">
        <DialogDismiss className="button secondary">Cancel</DialogDismiss>
        <Button className="button" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Dialog>
  )
}

export default ConfirmDialog
