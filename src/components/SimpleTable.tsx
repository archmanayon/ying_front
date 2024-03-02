import { cn } from '@/helpers'
import { ImportData } from '@/hooks/useImport'

type Props = {
  columns: string[]
  rows: ImportData
}

const SimpleTable = ({ columns, rows }: Props) => {
  return (
    <>
      <table className="min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={cn(
                  'sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 text-left text-sm font-semibold uppercase text-gray-900 backdrop-blur backdrop-filter',
                  index === 0 ? 'pl-4 pr-3 sm:pl-6 lg:pl-8' : '',
                  index > 0 ? 'px-3' : '',
                  index === 1 ? 'sm:table-cell' : '',
                  index === 2 ? 'lg:table-cell' : '',
                  [1, 2].includes(index) ? 'hidden' : '',
                  index === columns.length - 1
                    ? 'pl-3 pr-4 sm:pr-6 lg:pr-8'
                    : '',
                )}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: any, index: number) => (
            <tr key={index}>
              {columns.map((column, tdIndex) => (
                <td
                  key={tdIndex}
                  className={cn(
                    tdIndex !== rows.length - 1
                      ? 'border-b border-gray-200'
                      : '',
                    'whitespace-nowrap py-4 text-sm text-gray-500',
                    tdIndex === 0 ? 'pl-4 pr-3 sm:pl-6 lg:pl-8' : '',
                    tdIndex > 0 ? 'px-3' : '',
                    tdIndex === 1 ? 'sm:table-cell' : '',
                    tdIndex === 2 ? 'lg:table-cell' : '',
                    [1, 2].includes(tdIndex) ? 'hidden' : '',
                    row.isDuplicate ? '!text-red-400' : '',
                  )}
                >
                  {row[column]}
                </td>
              ))}
              {/* <td
            className={cn(
              'relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-8 lg:pr-8',
            )}
          >
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-900"
            >
              Edit
              <span className="sr-only">
                , {row.name}
              </span>
            </a>
          </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default SimpleTable
