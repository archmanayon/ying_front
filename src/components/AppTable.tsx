import { cn } from '@/helpers'
import { Row } from '@/hooks/useImport'

type Props = {
  columns: string[]
  rows: Row[]
  duplicates: number[]
  // limit: number
  // page: number
}

const AppTable = ({ columns, rows, duplicates }: Props) => {
  // const limitedRows = rows.slice((page - 1) * limit, page * limit)
  console.log(duplicates)

  return (
    <div className="flex flex-col">
      {/* overflow-x-auto */}
      <div className="-m-1.5 ">
        <div className="inline-block min-w-full p-1.5 align-middle">
          <div className="relative">
            <table className="mt-3 min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="sticky top-0 z-20 bg-gray-100">
                <tr className="">
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="h-12 px-6 py-5 text-start text-xs font-semibold uppercase text-gray-500"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="z-10 divide-y divide-gray-200 dark:divide-gray-700">
                {rows.map((row, index) => (
                  <tr key={index}>
                    {columns.map((column, tdIndex) => (
                      <td
                        key={tdIndex}
                        className={cn(
                          'whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-200',
                          duplicates.includes(index)
                            ? 'text-red-700 opacity-70'
                            : '',
                        )}
                      >
                        {row[column]}
                      </td>
                    ))}
                    {/* <td className="whitespace-nowrap px-6 py-4 text-end text-sm font-medium">
                      <button
                        type="button"
                        className="inline-flex items-center gap-x-2 rounded-lg border border-transparent text-sm font-semibold text-blue-600 hover:text-blue-800 disabled:pointer-events-none disabled:opacity-50 dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >
                        Delete
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppTable
