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
  const [bookTitles, SetBookTitles] = useState({})
  const [selectedTitle, setSelectedTitle] = useState('')
  const [columns, setColumns] = useState<ColDef[]>([])
  const [rows, setRows] = useState<Row[]>([])
  const { data, isPending } = useRoyalties()
  const gridRef = useRef<AgGridReact>(null)

  // useMemo to memorize the unique authors
  useMemo(() => {
    const authorsSet = new Set<string>()
    const bookTitlesSet = new Set<string>()

    data?.forEach((item) => {
      authorsSet.add(item.author)
      bookTitlesSet.add(item.title)
    })
    SetAuthors([...authorsSet])
    SetBookTitles([...bookTitlesSet])

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

  // Author dropdown change handler
  const onselect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newAuthor = event.target.value
    setSelectedAuthor(newAuthor)
    gridApi?.updateGridOptions({ quickFilterText: newAuthor })
  }

  // bookTitles dropdown handler
  const onTitle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTitle = event.target.value
    setSelectedAuthor(newTitle)
    gridApi?.updateGridOptions({ quickFilterText: newTitle })
  }

  // Date filter handler

  //   const newDate = event.target.value
  //   setSelectedDate(newDate)

  //   gridApi?.updateGridOptions({ quickFilterText: newDate })
  // }
  const updateGridFilters = () => {
    const filterText = `${selectedAuthor} ${selectedTitle}`.trim()
    gridApi?.updateGridOptions({ quickFilterText: filterText })
  }
  // AG Grid ready event
  const onGridReady = (params: any) => {
    updateGridFilters()
    setGridApi(params.api)
  }
  console.log(onGridReady)

  return (
    <div>
      <LayoutContainer
        title="Royalties"
        authors={authors}
        onselect={onselect}
        bookTitles={bookTitles}
        onTitle={onTitle}
      >
        <div className="h-[80vh]">
          {data && data.length ? (
            <div className="ag-theme-quartz h-full w-full">
              <AgGridReact
                onGridReady={onGridReady}
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
