import React, { useState, useEffect } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";
import { HashLink } from "react-router-hash-link";
import { useLocation, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Safe Maps", href: "/neutrality" },
  
  { name: "About Us", href: "/aboutus" }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Enavbar({ className }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [navs, setNavs] = useState(navigation);

  useEffect(() => {
    const updatedNavs = navs.map(nav => ({
      ...nav,
      current: location.pathname === nav.href
    }));
    setNavs(updatedNavs);
  }, [location.pathname, navs]);

  return (
    <Disclosure as="nav" className={`bg-gradient-to-r from-[#FF6F61] to-[#D5006D] ${className}`}>
      {({ open }) => (
        <>
          <div className="w-full px-4">
            <div className="relative flex items-center justify-between h-24 max-w-screen-2xl mx-auto">
              {/* Mobile menu button */}
              <div className="sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#D5006D] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Title */}
              <div className="flex-shrink-0">
                <h1 className="font-bold text-white text-4xl">SafeSpace</h1>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden sm:flex flex-grow justify-center">
                <div className="flex space-x-8">
                  {navs.map((item) => (
                    <HashLink
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "text-transparent bg-clip-text bg-gradient-to-br from-[#FFC300] to-[#FF5733] text-xl"
                          : "text-white",
                        "px-4 py-2 rounded-md text-lg font-medium hover:text-white hover:scale-110 ease-in duration-200"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </HashLink>
                  ))}
                </div>
              </div>

              
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navs.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-[#D5006D] text-white"
                      : "text-white hover:bg-[#D5006D]",
                    "block px-4 py-3 rounded-md text-lg font-semibold"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Enavbar;
