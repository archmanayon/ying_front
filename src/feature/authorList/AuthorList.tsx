import LayoutContainer from '@/components/LayoutContainer'
import { Row } from '@/hooks/useImport'
import usePageTitle from '@/hooks/usePageTitle'
import useRoyalties from '@/hooks/useRoyalties'
import useDropdownStore from '@/store/dropdownStore'
import LoopIcon from '@mui/icons-material/Loop'
import { ColDef } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { AgGridReact } from 'ag-grid-react'
import { useEffect, useMemo, useState } from 'react'
import { boolean } from 'yup'

const AuthorList = () => {
  usePageTitle('Author List')

  const [gridApi, setGridApi] = useState(null)
  const {
    setAuthors,
    selectedAuthor,
    setSelectedAuthor,
    setBookTitles,
    selectedTitle,
    setSelectedTitle,
    setReportDates,
    selectedReportDate,
    setSelectedReportDate,
  } = useDropdownStore()

  // const setAuthors = useDropdownStore((a) => a.setAuthors)
  // const selectedAuthor = useDropdownStore((a) => a.selectedAuthor)
  // const setSelectedAuthor = useDropdownStore((a) => a.setSelectedAuthor)

  // const setBookTitles = useDropdownStore((a) => a.setBookTitles)
  // const selectedTitle = useDropdownStore((a) => a.selectedTitle)
  // const setSelectedTitle = useDropdownStore((a) => a.setSelectedTitle)

  // const setReportDates = useDropdownStore((a) => a.setReportDates)
  // const selectedReportDate = useDropdownStore((a) => a.selectedReportDate)
  // const setSelectedReportDate = useDropdownStore((a) => a.setSelectedReportDate)

  const [columns, setColumns] = useState<ColDef[]>([])
  const [rows, setRows] = useState<Row[]>([])
  const { data, isPending } = useRoyalties()

  useEffect(() => {
    const authorsSet = new Set<string>()
    const bookTitlesSet = new Set<string>()
    const reportDatesSet = new Set<string>()

    // setting up for dropdowns
    data?.forEach((item: any) => {
      if (selectedAuthor && selectedAuthor === item.author) {
        authorsSet.add(item.author)
        bookTitlesSet.add(item.title)
        reportDatesSet.add(item.report_date)
      }
      authorsSet.add(item.author)
    })
    setAuthors(authorsSet)
    setBookTitles(bookTitlesSet)
    setReportDates(reportDatesSet)

    if (data && data.length) {
      const outputArray = Object.keys(data[0]).map((fieldName) => ({
        field: fieldName,
      }))

      setColumns(outputArray)
      setRows(data)
    }
  }, [data, selectedAuthor, selectedTitle, selectedReportDate])

  if (isPending) {
    return (
      <LayoutContainer title="Royalties">
        <div className="flex h-[75vh] w-full items-center justify-center">
          <LoopIcon className="animate-spin" fontSize="large" />
        </div>
      </LayoutContainer>
    )
  }

  // Function to apply both author, title, and reportDate filters
  const applyFilters = (
    author: string | undefined,
    title: string | undefined,
    report_date: string | undefined,
  ) => {
    if (gridApi) {
      // Get the current filter model
      const currentFilterModel = gridApi.getFilterModel()

      // Update the filter model for the author title and reportDate columns
      currentFilterModel['author'] = author
        ? { type: 'contains', filter: author }
        : null
      currentFilterModel['title'] = title
        ? { type: 'contains', filter: title }
        : null

      currentFilterModel['report_date'] = report_date
        ? { type: 'contains', filter: report_date }
        : null

      // Set the updated filter model back to the grid
      gridApi.setFilterModel(currentFilterModel)
    }
  }
  // Author dropdown (dapat 'newAuthor jud' fresh with 'SelectedTItle')

  const onSelectAuthor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newAuthor = event.target.value
    setSelectedAuthor(newAuthor)
    applyFilters(newAuthor, selectedTitle, selectedReportDate)
  }

  // bookTitles dropdown handler
  const onTitle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTitle = event.target.value
    setSelectedTitle(newTitle)
    applyFilters(selectedAuthor, newTitle, selectedReportDate)
  }

  // ReportDates dropdown handler
  const onReportDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newReportDate = event.target.value
    setSelectedReportDate(newReportDate)
    applyFilters(selectedAuthor, selectedTitle, newReportDate)
  }

  const onGridReady = (params: any) => {
    setGridApi(params.api)
  }
  console.log(selectedAuthor)
  return (
    <div>
      <LayoutContainer
        title="Royalties"
        onSelectAuthor={onSelectAuthor}
        selectedTitle={selectedTitle}
        onTitle={onTitle}
        selectedReportDate={selectedReportDate}
        onReportDate={onReportDate}
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
