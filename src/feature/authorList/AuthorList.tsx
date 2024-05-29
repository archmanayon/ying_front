import LayoutContainer from '@/components/LayoutContainer'
import { Row } from '@/hooks/useImport'
import usePageTitle from '@/hooks/usePageTitle'
import useRoyalties from '@/hooks/useRoyalties'
import { ColDef } from 'ag-grid-community'
import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import LoopIcon from '@mui/icons-material/Loop'

const AuthorList = () => {
  return (
    <LayoutContainer title="Author List">
      <div className="h-[80vh]">
        <div className="flex h-full w-full items-center justify-center">
          Whoops! We did not find anything to show here.
        </div>
      </div>
    </LayoutContainer>
  )
}

export default AuthorList
