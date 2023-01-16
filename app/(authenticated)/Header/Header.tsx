"use client";

import { Disclosure } from "@headlessui/react";
import cx from "clsx";
import { IconButton } from "components/IconButton";
import { Logo } from "components/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { ProfileMenu } from "./ProfileMenu";

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

  return (
    <header className="border-b border-b-grey-400 bg-white">
      <Disclosure as="nav">
        <div className="mx-auto max-w-5xl px-2">
          <div className="flex h-16 items-center justify-between">
            <div className="sm:hidden">
              <Disclosure.Button as={Fragment}>
                {({ open }) => (
                  <IconButton
                    icon={open ? "XIcon" : "Menu2Icon"}
                    aria-label={open ? "Close main menu" : "Open main menu"}
                  />
                )}
              </Disclosure.Button>
            </div>
            <div className="grid h-10 w-10 place-items-center">
              <Logo size={28} />
            </div>
            <div className="ml-10 hidden gap-6 font-medium text-grey-600 sm:flex sm:flex-grow">
              {nav.map(({ name, href }) => {
                const isCurrent = href === pathname;

                return (
                  <Link
                    href={href}
                    className={cx(
                      "grid h-10 place-items-center rounded px-2 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                      isCurrent && "text-primary-600"
                    )}
                    aria-current={isCurrent ? "page" : undefined}
                    key={name}
                  >
                    {name}
                  </Link>
                );
              })}
            </div>
            <ProfileMenu />
          </div>
        </div>
        <Disclosure.Panel className="mx-2 mb-2 flex flex-col gap-2 rounded-md bg-grey-100 px-3 py-3 sm:hidden">
          {nav.map(({ name, href }) => {
            const isCurrent = href === pathname;

            return (
              <Disclosure.Button
                as={Link}
                href={href}
                className={cx(
                  "rounded py-2 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                  isCurrent && "bg-primary-500 text-white",
                  !isCurrent && "hover:bg-grey-200"
                )}
                aria-current={isCurrent ? "page" : undefined}
                key={name}
              >
                {name}
              </Disclosure.Button>
            );
          })}
        </Disclosure.Panel>
      </Disclosure>
    </header>
  );
};

export { Header };
