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
  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newAuthor = event.target.value
    setSelectedAuthor(newAuthor)
    applyFilters(newAuthor, selectedTitle)
  }

  // bookTitles dropdown handler
  const onTitle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTitle = event.target.value
    setSelectedTitle(newTitle)
    applyFilters(selectedAuthor, newTitle)
  }

  // Function to apply both author and title filters
  const applyFilters = (author: string, title: string) => {
    // Ensure that the gridApi is available
    if (gridApi) {
      // Get the current filter model
      const currentFilterModel = gridApi.getFilterModel()

      // Update the filter model for the author and title columns
      currentFilterModel['author'] = author
        ? { type: 'contains', filter: author }
        : null
      currentFilterModel['title'] = title
        ? { type: 'contains', filter: title }
        : null

      // Set the updated filter model back to the grid
      gridApi.setFilterModel(currentFilterModel)
    }
  }

  // Function to apply both author and title filters
  // const applyFilters = (author, title) => {
  //   const authorFilterComponent = gridApi?.getFilterInstance('author')
  //   const titleFilterComponent = gridApi?.getFilterInstance('title')

  //   authorFilterComponent.setModel({
  //     type: 'contains',
  //     filter: author,
  //   })
  //   titleFilterComponent.setModel({
  //     type: 'contains',
  //     filter: title,
  //   })

  //   gridApi?.onFilterChanged()
  // }
  // AG Grid ready event
  const onGridReady = (params: any) => {
    setGridApi(params.api)
  }

  return (
    <div>
      <LayoutContainer
        title="Royalties"
        authors={authors}
        onselect={onSelect}
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
