import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link'
import LoadingSpiner from '../LoadingSpinner/LoadingSpinner'

export default function Example() {
  const router = useRouter()
  const { user, error, isLoading } = useUser()
  const isAuthenticated = !isLoading && user !== undefined
  return (
    <div className="fixed top-0 right-0 p-3 dark:bg-surface-dark bg-surface w-full shadow h-[60px] flex items-center z-50">
      {isLoading ? <LoadingSpiner /> : (
        <>
          <Link href="/">{router.query.storeId ?? 'Ecommerce'}</Link>
          <Menu as="div" className="relative inline-block text-left ml-auto">
            <Menu.Button className="inline-flex w-full justify-center rounded-md dark:bg-primary-variant-dark bg-primary-variant px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              Menu
              <ChevronDownIcon
                className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-surface dark:bg-surface-dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  {!isAuthenticated && (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={`${active ? 'bg-violet-500' : 'dark:text-white text-gray-900'} text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            href="/api/auth/login"
                          >
                            Iniciar sesion
                          </a>
                        )}
                      </Menu.Item>
                    </>
                  )}
                  {isAuthenticated && (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${active ? 'bg-violet-500' : 'dark:text-white text-gray-900'
                              } text-white group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                            onClick={() => router.push('/admin')}
                          >
                            Administrar
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${active ? 'bg-violet-500' : 'dark:text-white text-gray-900'
                              } text-white group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                            onClick={() => router.push('/admin/store')}
                          >
                            Tienda
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${active ? 'bg-violet-500' : 'dark:text-white text-gray-900'
                              } text-white group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                            onClick={() => router.push('/admin/orders')}
                          >
                            Ordenes
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a className={`${active ? 'bg-violet-500' : 'dark:text-white text-gray-900'
                            } text-white group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`} href="/api/auth/logout">Cerrar sesion</a>
                        )}
                      </Menu.Item>
                    </>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          {
            isAuthenticated && <img src={user?.picture as string} className="h-full ml-2 rounded" alt="user picture" referrerPolicy="no-referrer" />
          }
        </>
      )}
    </div>
  )
}