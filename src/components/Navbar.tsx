import { Fragment } from 'react'
import useNavbarStore from '../store/navbarStore'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import NavbarLink from './NavbarLink'
import useAuthStore from '@/store/authStore'
import { cn } from '@/helpers'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const { options, userOptions, setSidebarOpen } = useNavbarStore((store) => ({
    options: store.options,
    userOptions: store.userOptions,
    setSidebarOpen: store.setSidebarOpen,
  }))
  const name = useAuthStore((store) => store.name)

  return (
    <>
      <Disclosure as="nav" className="border-b border-gray-200 bg-white">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center">
                    {/* <img
                      className="block h-8 w-auto lg:hidden"
                      src={`https://ui-avatars.com/api/?name=E+C+Publishing&length=3&rounded=true&bold=true&size=128&format=svg`}
                      alt="EC Publishing LLC"
                    /> */}
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="https://i.imgur.com/1W7q7Zs.png"
                      alt="EC Publishing LLC"
                    />
                    <em className="font-bold">EC Publishing LLC</em>
                  </div>
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    {options.map((item, index) => (
                      <NavbarLink
                        key={index}
                        item={item}
                        activeClass="border-indigo-500 text-gray-900"
                        inactiveClass="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        className="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                      />
                    ))}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <button
                    type="button"
                    className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={`https://ui-avatars.com/api/?name=${name}&rounded=true&bold=true&size=128&format=svg&background=random`}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userOptions.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <NavLink
                                to={item.to}
                                className={cn(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700',
                                )}
                                onClick={() => {
                                  setSidebarOpen(false)
                                  if (item.command) item.command()
                                }}
                                aria-current={item.current ? 'page' : undefined}
                              >
                                {item.icon && (
                                  <item.icon
                                    className="mr-1 h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                )}
                                {item.name}
                              </NavLink>
                              // <NavbarLink
                              //   item={item}
                              //   className={cn(
                              //     active ? 'bg-gray-100' : '',
                              //     'block px-4 py-2 text-sm text-gray-700',
                              //   )}
                              // />
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {options.map((item, index) => (
                  <NavbarLink
                    key={index}
                    item={item}
                    activeClass="border-indigo-500 bg-indigo-50 text-indigo-700"
                    inactiveClass="border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                    className="block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                  />
                ))}
              </div>
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={`https://ui-avatars.com/api/?name=${name}&background=random&rounded=true&size=512&color=fff`}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {name}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  {userOptions.map((item, index) => (
                    <NavbarLink
                      key={index}
                      item={item}
                      className="block px-4 py-2 text-base font-medium text-red-500 hover:bg-gray-100 hover:text-gray-800"
                    />
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}

export default Navbar
