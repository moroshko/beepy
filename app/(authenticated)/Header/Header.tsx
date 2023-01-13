"use client";

import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import cx from "clsx";
import { Avatar } from "components/Avatar";
import { Logo } from "components/Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLogout } from "utils/hooks/useLogout";

const nav = [
  {
    name: "Dashboard",
    href: "/",
  },
  {
    name: "History",
    href: "/history",
  },
];

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const logoutMutation = useLogout();
  const onLogout = async () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push("/login");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <header>
      <Disclosure as="nav" className="bg-grey-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-grey-400 hover:bg-grey-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="shrink-0 self-center text-grey-400">
                    <Logo size="md" />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {nav.map(({ name, href }) => {
                        const isCurrent = href === pathname;

                        return (
                          <Link
                            href={href}
                            className={cx(
                              "rounded-md px-3 py-2 text-sm font-medium",
                              isCurrent
                                ? "bg-grey-900 text-white"
                                : "text-grey-300 hover:bg-grey-700 hover:text-white"
                            )}
                            aria-current={isCurrent ? "page" : undefined}
                            key={name}
                          >
                            {name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-grey-800 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-grey-800">
                        <span className="sr-only">Open user menu</span>
                        <Avatar />
                      </Menu.Button>
                    </div>

                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/profile"
                            className={cx(
                              "block px-4 py-2 text-sm text-grey-700",
                              active && "bg-grey-100"
                            )}
                          >
                            Your profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={cx(
                              "block w-full px-4 py-2 text-left text-sm text-grey-700",
                              active && "bg-grey-100"
                            )}
                            onClick={onLogout}
                          >
                            Log out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {nav.map(({ name, href }) => {
                  const isCurrent = href === pathname;

                  return (
                    <Disclosure.Button
                      as={Link}
                      href={href}
                      className={cx(
                        "block rounded-md px-3 py-2 text-base font-medium",
                        isCurrent
                          ? "bg-grey-900 text-white"
                          : "text-grey-300 hover:bg-grey-700 hover:text-white"
                      )}
                      aria-current={isCurrent ? "page" : undefined}
                      key={name}
                    >
                      {name}
                    </Disclosure.Button>
                  );
                })}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
};

export { Header };
