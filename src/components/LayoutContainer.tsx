import useDropdownStore from '@/store/dropdownStore'

type Props = {
  children: React.ReactNode
  title: string
  onInput?: (search: string) => void

  onSelectAuthor?: (e: React.ChangeEvent<HTMLSelectElement>) => void

  selectedTitle?: string
  onTitle?: (e: React.ChangeEvent<HTMLSelectElement>) => void

  selectedReportDate?: string
  onReportDate?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const LayoutContainer = ({
  children,
  onInput,
  onSelectAuthor,
  onTitle,
  onReportDate,
}: Props) => {
  const {
    authors,
    selectedAuthor,
    bookTitles,
    selectedTitle,
    reportDates,
    selectedReportDate,
  } = useDropdownStore()

  return (
    <>
      <div className="py-5">
        <header>
          <div className="mx-auto mb-5 flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900"></h1>
            {onInput && (
              <div className="">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Search"
                  onInput={(e) => onInput(e.currentTarget.value)}
                />
              </div>
            )}
            {onSelectAuthor && (
              <div className="mb-2 mr-2 w-48 ">
                <select
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => onSelectAuthor(e)}
                  value={selectedAuthor && selectedAuthor}
                >
                  <option value="">Show All Authors</option>
                  {authors?.sort().map((author, index) => (
                    <option key={index} value={author}>
                      {author}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {onTitle && selectedAuthor && (
              <div className="mb-2 mr-2 w-48 ">
                <select
                  className="block w-48 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => onTitle(e)}
                  value={selectedTitle && selectedTitle}
                >
                  <option value="">All Titles</option>
                  {bookTitles?.sort().map((title, index) => (
                    <option key={index} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {onReportDate && selectedAuthor && (
              <div className="mb-2 mr-2 w-48 ">
                <select
                  className="block w-48 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => onReportDate(e)}
                  value={selectedReportDate && selectedReportDate}
                >
                  <option value="">All Dates</option>
                  {reportDates?.sort().map((date, index) => (
                    <option key={index} value={date}>
                      {date}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  )
}

export default LayoutContainer
