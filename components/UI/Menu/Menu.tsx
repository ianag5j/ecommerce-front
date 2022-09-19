import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon, UserIcon } from '@heroicons/react/20/solid'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Example() {
  const router = useRouter()
  const isLoged = Cookies.get('sess') !== undefined
  return (
    <div className="fixed top-0 right-0 p-3 dark:bg-surface-dark bg-surface w-full shadow h-[60px] flex items-center z-50">
      <Link href="/">Ecommerce</Link>
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
              {!isLoged && (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-violet-500' : 'dark:text-white text-gray-900'
                          } text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => router.push('/login')}
                      >
                        Iniciar sesion
                      </button>
                    )}
                  </Menu.Item>
                </>
              )}
              {isLoged && (
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
                        onClick={() => router.push('/logout')}
                      >
                        Cerrar sesion
                      </button>
                    )}
                  </Menu.Item>
                </>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}