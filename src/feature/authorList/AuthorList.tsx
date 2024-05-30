import LayoutContainer from '@/components/LayoutContainer'
import { Row } from '@/hooks/useImport'
import usePageTitle from '@/hooks/usePageTitle'
import useRoyalties from '@/hooks/useRoyalties'
import { ColDef } from 'ag-grid-community'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import LoopIcon from '@mui/icons-material/Loop'

const AuthorList = () => {
  usePageTitle('Author List')

  const [gridApi, setGridApi] = useState(null)
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [authors, SetAuthors] = useState({})
  const [columns, setColumns] = useState<ColDef[]>([])
  const [rows, setRows] = useState<Row[]>([])
  const { data, isPending } = useRoyalties()
  const gridRef = useRef<AgGridReact>(null)

  // useMemo to memorize the unique authors
  useMemo(() => {
    const authorsSet = new Set<string>()
    data?.forEach((item) => {
      authorsSet.add(item.author)
    })
    SetAuthors([...authorsSet])
  }, [data]) // Dependency array with 'data'

  useEffect(() => {
    if (data && data.length) {
      const outputArray = Object.keys(data[0]).map((fieldName) => ({
        field: fieldName,
      }))

      setColumns(outputArray)
      setRows(data)
    }
  }, [data])

  if (isPending) {
    return (
      <LayoutContainer title="Royalties">
        <div className="flex h-[75vh] w-full items-center justify-center">
          <LoopIcon className="animate-spin" fontSize="large" />
        </div>
      </LayoutContainer>
    )
  }

  const onselect = (search: string) => {
    gridRef.current!.api.setGridOption('quickFilterText', search)
  }

  return (
    <div>
      <LayoutContainer title="Royalties" authors={authors} onselect={onselect}>
        <div className="h-[80vh]">
          {data && data.length ? (
            <div className="ag-theme-quartz h-full w-full">
              <AgGridReact
                ref={gridRef}
                rowData={rows}
                columnDefs={columns}
                defaultColDef={{
                  filter: true,
                  // editable: true,,
                }}
                pagination={true}
                paginationPageSize={50}
                paginationPageSizeSelector={[10, 25, 50, 100]}
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              Whoops! We did not find anything to show here.
            </div>
          )}
        </div>
      </LayoutContainer>
    </div>
  )
}

export default AuthorList
