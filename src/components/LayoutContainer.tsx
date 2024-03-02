type Props = {
  children: React.ReactNode
  title: string
}

const LayoutContainer = ({ title, children }: Props) => {
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  )
}

export default LayoutContainer
