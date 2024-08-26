import React, { useState } from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-[#BDE8CA] border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center space-x-3 rtl:space-x-reverse">
                </a>
        <div className="flex items-center md:order-2 space-x- md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded={isDropdownOpen}
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="/docs/images/people/profile-picture-3.jpg"
              alt="user photo"
            />
            <span className="text-white"></span>
          </button>

          {isDropdownOpen && (
            <ul
              className="absolute right-0 mt-12 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
            >
              <li>
                <Link
                  to='/Profile'
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Profile
                </Link>
              </li>
              <li>
                <hr className="border-t border-gray-200" />
              </li>
              <li>
                <Link
                  to='/'
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;