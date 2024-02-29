import { ChangeEvent, useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import { cn } from '@/helpers'
import useTheme from '@/hooks/useTheme'
import useImport from '@/hooks/useImport'
import useToastify from '@/hooks/useToastify'

const XlsxImport = () => {
  const { setAppTheme, isDarkTheme } = useTheme()
  const [columns, setColumns] = useState<string[]>([])
  const [result, setResult] = useState<any>([])
  const { toastSuccess } = useToastify()
  const { mutate } = useImport(() => toastSuccess('Import successful!'))

  useEffect(() => setAppTheme(), [isDarkTheme, setAppTheme])

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
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

          setColumns(propertyNames.map((prop) => prop))

          // Create an array of objects using property names and values
          const result = data.slice(1).map((row: any) => {
            const obj: Record<string, any> = {}
            propertyNames.forEach((prop, index) => {
              obj[prop] = row[index]
            })
            return obj
          })

          // setSampleData(result)
          setResult(result)
        }

        reader.readAsBinaryString(file)
      }
    }
  }

  const handleImport = () => {
    mutate({ ...result })
  }

  return (
    <div className="h-[83vh] space-y-3">
      <div className="flex items-center gap-5">
        <div className="rounded-lg border border-dashed border-gray-600 bg-gray-100 p-3">
          <input className="" type="file" onChange={handleFileUpload} />
        </div>
        {columns.length > 0 && (
          <div className="sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-lg bg-gray-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              onClick={handleImport}
            >
              Import
            </button>
          </div>
        )}
      </div>
      <div className="h-full bg-white px-4 sm:px-6 lg:px-8">
        <div className="pt-3 sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Royalties
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the royalties imported from the file you select.
            </p>
          </div>
        </div>
        {columns.length > 0 && (
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
              <div className="overflow-x-auto py-2 align-middle">
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
                          )}
                        >
                          {column}
                        </th>
                      ))}
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.map((row: any, index: number) => (
                      <tr key={index}>
                        {columns.map((column, tdIndex) => (
                          <td
                            key={tdIndex}
                            className={cn(
                              tdIndex !== result.length - 1
                                ? 'border-b border-gray-200'
                                : '',
                              'whitespace-nowrap py-4 text-sm text-gray-500',
                              tdIndex === 0 ? 'pl-4 pr-3 sm:pl-6 lg:pl-8' : '',
                              tdIndex > 0 ? 'px-3' : '',
                              tdIndex === 1 ? 'sm:table-cell' : '',
                              tdIndex === 2 ? 'lg:table-cell' : '',
                              [1, 2].includes(tdIndex) ? 'hidden' : '',
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
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default XlsxImport
