type Props = {
  children: React.ReactNode
  title: string
  onInput?: (search: string) => void
  authors?: string[]
  onselect?: (search: string) => void
}

const LayoutContainer = ({
  title,
  children,
  onInput,
  authors,
  onselect,
}: Props) => {
  return (
    <>
      <div className="py-5">
        <header>
          <div className="mx-auto mb-5 flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              {title}
            </h1>
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
                  onChange={(e) => onselect(e.currentTarget.value)}
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
