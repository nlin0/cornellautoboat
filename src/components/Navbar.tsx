'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

{
  /* Code for changing the tab color in the nav bar*/
}
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => path === pathname;

  return (
    <nav className="bg-[#ebd9d8] shadow-md sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-red-600 rounded-full mr-2"></div>
              <span className="font-bold text-xl text-gray-900">
                Cornell AutoBoat
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About' },
              { href: '/team', label: 'Team' },
              { href: '/technical', label: 'Technical Info' },
              { href: '/competition', label: 'Competition' },
              { href: '/media', label: 'Media' },
              { href: '/contact', label: 'Join Us', isButton: true },
            ].map(({ href, label, isButton }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-md text-md font-medium ${
                  isActive(href)
                    ? 'bg-[#6e0903] text-white'
                    : 'text-gray-900 hover:bg-red-100'
                } ${isButton ? 'bg-red-600 text-white hover:bg-red-700' : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About' },
              { href: '/team', label: 'Team' },
              { href: '/projects', label: 'Projects' },
              { href: '/media', label: 'Media' },
              { href: '/contact', label: 'Join Us', isButton: true },
            ].map(({ href, label, isButton }) => (
              <Link
                key={href}
                href={href}
                className={`block px-3 py-2 rounded-md text-base font-medium
                   ${
                     isActive(href)
                       ? 'bg-[#6e0903] text-white'
                       : 'text-gray-900 hover:bg-red-100'
                   }
                  ${isButton ? 'bg-red-600 text-white hover:bg-red-700' : ''}
                `}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
