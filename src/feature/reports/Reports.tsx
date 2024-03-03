import LayoutContainer from '@/components/LayoutContainer'
import usePageTitle from '@/hooks/usePageTitle'

const Reports = () => {
  usePageTitle('Reports')

  return (
    <LayoutContainer title="Reports">
      <div className="flex h-[75vh] w-full items-center justify-center"></div>
    </LayoutContainer>
  )
}

export default Reports
