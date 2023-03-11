/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';
import { validateUserPermissions } from '../../utils/auth/validateUserPermissions';

import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';

const navigation = ['Dashboard', 'Usuários'];

export const Nav = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    signOut();
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-14 w-14"
                    src="/img/profile-share.png"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item, itemIdx) =>
                      itemIdx === 0 ? (
                        <Fragment key={item}>
                          <a
                            href="/dashboard"
                            className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                              router.asPath === '/dashboard' &&
                              'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
                            }`}
                          >
                            {item}
                          </a>
                        </Fragment>
                      ) : (
                        <>
                          {user !== null && validateUserPermissions(user) && (
                            <a
                              key={item}
                              href="/user"
                              className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                                router.asPath === '/user' &&
                                'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
                              }`}
                            >
                              {item}
                            </a>
                          )}
                        </>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                              <svg
                                className="absolute w-12 h-12 text-gray-400 -left-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </div>
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item>
                              <button
                                onClick={handleLogout}
                                className="block px-4 py-2 text-sm text-gray-700"
                              >
                                Sair
                              </button>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>

              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item, itemIdx) =>
                itemIdx === 0 ? (
                  <Fragment key={item}>
                    <a
                      href="/dashboard"
                      className={`text-gray-300 text-white block px-3 py-2 rounded-md text-base font-medium ${
                        router.asPath === '/dashboard' &&
                        'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
                      }`}
                    >
                      {item}
                    </a>
                  </Fragment>
                ) : (
                  <>
                    {user !== null && validateUserPermissions(user) && (
                      <a
                        key={item}
                        href="/user"
                        className={`text-gray-300 text-white block px-3 py-2 rounded-md text-base font-medium ${
                          router.asPath === '/user' &&
                          'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
                        }`}
                      >
                        {item}
                      </a>
                    )}
                  </>
                )
              )}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg
                    className="absolute w-12 h-12 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>

                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {user?.name}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {user?.email}
                  </div>
                </div>

                <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <button
                  onClick={handleLogout}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  Sair
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
