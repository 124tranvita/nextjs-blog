"use client";

import { FC } from "react";
import classNames from "classnames";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import SearchBar from "../components/search-bar";
import ThemeToggle from "../components/toggle/theme-toggle";
import LanguageToggle from "../components/toggle/language-toggle";
import AuthToggle from "../components/toggle/auth-toggle";
import { Link } from "../components/custom-link";
import useDictionary from "../hooks/useDictionary";

type Props = {
  className: string;
};

export const BrandName: FC<Props> = ({ className }) => {
  const { lang } = useDictionary();
  return (
    <>
      <div className={className}>
        <Link href={`/?lang=${lang}`}>
          <h1 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
            <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
              My
            </mark>
            Blog
          </h1>
        </Link>
        <span className=" bg-gray-700 text-white text-xl font-semibold rounded-md px-2 py-1 mx-1">
          {`/`}
        </span>
      </div>
    </>
  );
};

export const Navbar: FC = () => {
  return (
    <Disclosure
      as="nav"
      className="bg-white sticky top-0 z-40 max-w-full rounded-none px-4 py-[5px] shadow-lg dark:bg-gray-900"
    >
      {({ open }) => (
        <>
          <div className="mx-auto h-[65px] max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div>
                  <BrandName className="flex flex-shrink-0 items-center" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 items-center">
                    <SearchBar />
                  </div>
                </div>
              </div>
              <div className="flex align-baseline items-center">
                <ThemeToggle />
                <LanguageToggle />
                <AuthToggle />
                {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div> */}
              </div>
            </div>
          </div>

          {/* Mobile panel */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <div className="md:hidden sm:ml-6 sm:block">
                <div className="flex space-x-4 items-center">
                  <SearchBar />
                </div>
              </div>
              {/* {NAVIGATION.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))} */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
