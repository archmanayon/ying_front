import { ChangeEvent, useEffect, useRef, useState } from 'react'
import * as XLSX from 'xlsx'
import useTheme from '@/hooks/useTheme'
import useImport, { Row } from '@/hooks/useImport'
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
import usePageTitle from '@/hooks/usePageTitle'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { ColDef } from 'ag-grid-community'

const validExtensions = ['xls', 'xlsx', 'csv']

const ImportRoyalties = () => {
  const { setAppTheme, isDarkTheme } = useTheme()
  const [columns, setColumns] = useState<ColDef[]>([])
  const [rows, setRows] = useState<Row[]>([])
  const [duplicates, setDuplicates] = useState<number[]>([])
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toastError } = useToastify()
  const { toastWarning, toastSuccess } = useToastify({ autoClose: false })
  const { mutate, isPending } = useImport((response) => {
    if (response?.duplicates.length)
      toastWarning('Duplicates found: ' + response?.duplicates.length)

    setDuplicates(response?.duplicates ?? [])

    if (response?.imported)
      toastSuccess(`Successful import: ${response.imported}`)
  })
  const [showDialog, setShowDialog] = useState(false)
  usePageTitle('Import')
  const gridRef = useRef<AgGridReact>(null)

  useEffect(() => setAppTheme(), [isDarkTheme, setAppTheme])

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault()
    setDuplicates([])
    setSelectedFile(e.target.files?.[0])

    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase()
      if (fileExtension && validExtensions.indexOf(fileExtension) === -1) {
        if (fileInputRef.current) fileInputRef.current.value = ''
        return toastError(
          'Please select an Excel (.xls, .xlsx) or CSV (.csv) file.',
          'invalid-file',
        )
      }
    }

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

          const columns: ColDef[] = propertyNames.map((prop) => ({
            field: prop,
          }))

          // columns = [
          //   {
          //     field: 'actions',
          //     headerName: '',
          //     cellRenderer: (p: any) => (
          //       <div>
          //         <button
          //           type="button"
          //           className="rounded-full p-1 text-xs text-red-500 hover:bg-gray-50"
          //         >
          //           <CloseIcon fontSize="small" />
          //         </button>
          //         <span>{p.value}</span>
          //       </div>
          //     ),
          //     width: 60,
          //   },
          //   ...columns,
          // ]

          setColumns(columns)
          // setColumns(propertyNames.map((prop) => prop))

          // Create an array of objects using property names and values
          const result = data.slice(1).map((row: any) => {
            const obj: Record<string, any> = {}
            propertyNames.forEach((prop, index) => {
              obj[prop] = row[index]
            })
            return obj
          })

          setRows(result)
        }

        reader.readAsBinaryString(file)
      }
    }
  }

  const handleImport = () => {
    if (!columns.length) toastError('Please select a file to import.')
    const tryme: Row[] = []
    gridRef.current?.api.forEachNodeAfterFilterAndSort((rowNode) => {
      tryme.push(rowNode.data)
    })

    mutate({ ...tryme })
  }

  const handleClear = () => {
    gridRef.current?.api.setFilterModel(null)
    gridRef.current?.api.onFilterChanged()
    gridRef.current?.api.applyColumnState({
      defaultState: { sort: null },
    })
    setShowDialog(false)
  }

  const hasFile = !!fileInputRef.current?.value

  const fileInfo = () => {
    if (!hasFile)
      return (
        <>
          <FileUploadIcon />
          <span>Choose a file</span>
        </>
      )

    return (
      <span className="font-semibold">
        <AttachFileIcon />
        {fileInputRef.current?.value.split(/[\\/]/).pop()}
      </span>
    )
  }

  // const handleResetClick = () => {
  //   const tryme: Row[] = []
  //   gridRef.current?.api.forEachNodeAfterFilterAndSort((rowNode) => {
  //     tryme.push(rowNode.data.isbn)
  //   })
  // }

  return (
    <>
      <ConfirmDialog
        message="Do you want to reset the table? This will remove all filters and sorting."
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={handleClear}
        confirmLabel="Reset"
      />
      <LayoutContainer title="Import Royalties">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-full rounded-lg border border-dashed border-gray-600 bg-gray-100">
              <label
                htmlFor="file-upload"
                className={cn(
                  'relative flex h-full w-full cursor-pointer justify-center p-2',
                  !hasFile ? 'italic' : '',
                )}
              >
                <span className="text-base">{fileInfo()}</span>
              </label>
              <input
                id="file-upload"
                className={cn(
                  'hidden w-full cursor-pointer',
                  isPending ? 'opacity-50' : '',
                )}
                type="file"
                accept=".xls, .xlsx, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
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
              Reset
            </Button>
          </div>
          {hasFile && (
            <div className="h-[75vh]">
              <div className="ag-theme-quartz h-full w-full">
                <AgGridReact
                  ref={gridRef}
                  rowData={rows}
                  columnDefs={columns}
                  defaultColDef={{
                    filter: true,
                    editable: true,
                  }}
                  pagination={true}
                  paginationPageSize={50}
                  paginationPageSizeSelector={[10, 25, 50, 100]}
                  getRowStyle={(params) => {
                    if (
                      params.node?.rowIndex !== null &&
                      duplicates.includes(params.node?.rowIndex)
                    ) {
                      return { color: '#b91c1c', opacity: 0.7 }
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </LayoutContainer>
    </>
  )
}

export default ImportRoyalties
