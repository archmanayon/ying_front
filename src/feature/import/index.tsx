import { ChangeEvent, useEffect, useRef, useState } from 'react'
import * as XLSX from 'xlsx'
import useTheme from '@/hooks/useTheme'
import useImport from '@/hooks/useImport'
import useToastify from '@/hooks/useToastify'
import RefreshIcon from '@mui/icons-material/Refresh'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import LoopIcon from '@mui/icons-material/Loop'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import { cn } from '@/helpers'
import ConfirmDialog from '@/components/ConfirmDialog'
import { Button } from '@ariakit/react'
import LayoutContainer from '@/components/LayoutContainer'
import AppTable from '@/components/AppTable'

const ImportRoyalties = () => {
  const { setAppTheme, isDarkTheme } = useTheme()
  const [columns, setColumns] = useState<string[]>([])
  const [result, setResult] = useState<any>([])
  const [duplicates, setDuplicates] = useState<number[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toastSuccess, toastWarning, toastError } = useToastify()
  const { mutate, isPending } = useImport((response) => {
    if (response?.duplicates.length)
      toastWarning('Duplicates found: ' + response?.duplicates.length)
    setDuplicates(response?.duplicates ?? [])

    // response?.duplicates.map((duplicate) => {
    //   console.log(result[duplicate.index])
    //   // result[duplicate.index]['isDuplicate'] = true
    // })

    // result.forEach((row: Row) => {
    //   if (
    //     response?.duplicates.some(
    //       (duplicate: Row) => duplicate.isbn === row.isbn,
    //     )
    //   ) {
    //     row['isDuplicate'] = true
    //   }
    // })

    if (response?.imported)
      toastSuccess(`Successfully imported: ${response.imported}`)
  })
  const [showDialog, setShowDialog] = useState(false)
  // const [page, setPage] = useState(1)

  useEffect(() => setAppTheme(), [isDarkTheme, setAppTheme])

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const files = e.target.files
    if (files) {
      for (const file of Array.from(files)) {
        const reader = new FileReader()

        reader.onload = (evt) => {
          const bstr = evt.target?.result
          const wb = XLSX.read(bstr, { type: 'binary' })

          // Get the first worksheet
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]

          // Convert array of arrays to JSON
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 })

          // Now 'data' contains the rows and columns in JSON format
          // console.log('Data:', data)

          const propertyNames: string[] = data[0] as string[]

          setColumns(propertyNames.map((prop) => prop))

          // Create an array of objects using property names and values
          const result = data.slice(1).map((row: any) => {
            const obj: Record<string, any> = {}
            propertyNames.forEach((prop, index) => {
              obj[prop] = row[index]
            })
            return obj
          })

          setResult(result)
        }

        reader.readAsBinaryString(file)
      }
    }
  }

  const handleImport = () => {
    if (!columns.length) toastError('Please select a file to import.')
    mutate({ ...result })
  }

  const handleClear = () => {
    setColumns([])
    if (fileInputRef.current) fileInputRef.current.value = ''
    setShowDialog(false)
  }

  const hasFile = !!fileInputRef.current?.value
  // const totalRecords = result.length
  // const pages = Math.ceil(totalRecords / 10)

  return (
    <>
      <ConfirmDialog
        message="Are you sure you want to clear the imported data?"
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={handleClear}
      />
      <LayoutContainer title="Royalties">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-full rounded-lg border border-dashed border-gray-600 bg-gray-100">
              <label
                htmlFor="file-upload"
                className={cn(
                  'relative flex h-full w-full cursor-pointer items-center justify-center p-2 text-center',
                  !hasFile ? 'italic' : '',
                )}
              >
                {hasFile ? (
                  <AttachFileIcon className="mr-3" />
                ) : (
                  <FileUploadIcon className="mr-3" />
                )}
                <span className="text-base">
                  {fileInputRef.current?.value.split(/[\\/]/).pop() ||
                    'Choose a file'}
                </span>
              </label>
              <input
                id="file-upload"
                className={cn(
                  'hidden w-full cursor-pointer',
                  isPending ? 'opacity-50' : '',
                )}
                type="file"
                onChange={handleFileUpload}
                ref={fileInputRef}
                disabled={isPending}
              />
            </div>
            <Button
              className="button"
              onClick={handleImport}
              disabled={!columns.length || isPending}
            >
              {isPending ? (
                <LoopIcon className="animate-spin" />
              ) : (
                <SaveAltIcon />
              )}
              Import
            </Button>
            <Button
              className="button"
              onClick={() => setShowDialog(true)}
              disabled={!columns.length || isPending}
            >
              <RefreshIcon />
              Clear
            </Button>
          </div>
          {hasFile && (
            <div className="relative max-h-[75vh] space-y-5 overflow-auto rounded-lg border border-gray-400 bg-white px-8 pb-3 pt-5">
              <AppTable
                columns={columns}
                rows={result}
                duplicates={duplicates}
                // page={page}
                // limit={10}
              />
              {/* <div className="flex w-full items-center justify-between py-1">
                <span>{'sdfljksdfljksd'}</span>
                <nav className="flex items-center space-x-1">
                  <button
                    type="button"
                    className="inline-flex items-center gap-x-2 rounded-full p-2.5 text-sm text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    onClick={() => setPage(page - (page > 1 ? 1 : 0))}
                    disabled={page === 1}
                  >
                    <WestIcon />
                    <span className="sr-only">Previous</span>
                  </button>
                  {Array.from({ length: pages }, (_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={cn(
                        'flex min-w-[40px] items-center justify-center rounded-full py-2.5 text-sm text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-white/10',
                        page === index + 1 ? 'bg-gray-100' : '',
                      )}
                      onClick={() => setPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    type="button"
                    className="inline-flex items-center gap-x-2 rounded-full p-2.5 text-sm text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    onClick={() => setPage(page + (page < pages ? 1 : 0))}
                    disabled={page === pages}
                  >
                    <span className="sr-only">Next</span>
                    <EastIcon />
                  </button>
                </nav>
              </div> */}
            </div>
          )}
        </div>
      </LayoutContainer>
    </>
  )
}

export default ImportRoyalties
