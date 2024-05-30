type Props = {
  children: React.ReactNode
  title: string
  onInput?: (search: string) => void
  authors?: string[]
  bookTitles?: string[]
  onselect?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onTitle?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const LayoutContainer = ({
  children,
  onInput,
  authors,
  onselect,
  bookTitles,
  onTitle,
}: Props) => {
  return (
    <>
      <div className="py-5">
        <header>
          <div className="mx-auto mb-5 flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900"></h1>
            {onInput && (
              <div>
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Search"
                  onInput={(e) => onInput(e.currentTarget.value)}
                />
              </div>
            )}
            {onselect && (
              <div>
                <select
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => onselect(e)}
                  value=""
                >
                  <option value="">Select an Author</option>
                  {authors?.map((author, index) => (
                    <option key={index} value={author}>
                      {author}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {onTitle && (
              <select
                className="block w-48 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => onTitle(e)}
                value=""
              >
                <option value="">Titles</option>
                {bookTitles?.map((title, index) => (
                  <option key={index} value={title}>
                    {title}
                  </option>
                ))}
              </select>
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
