'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTechnicalOpen, setIsTechnicalOpen] = useState(false); // mobile
  const [isTechnicalOpenDesktop, setIsTechnicalOpenDesktop] = useState(false); // desktop

  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTechnicalMobile = () => setIsTechnicalOpen(!isTechnicalOpen);
  const toggleTechnicalDesktop = () =>
    setIsTechnicalOpenDesktop(!isTechnicalOpenDesktop);

  const isActive = (path: string) => path === pathname;

  const technicalSubpages = [
    'Perception',
    'Artificial Intelligence',
    'Controls & Microcontroller Designs',
    'ROS & Simulations',
    'Ground Station',
    'Mechanical',
    'Robotics',
    'Electrical Systems',
  ];

  return (
    <nav className="bg-[#ffffff] shadow-md sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-red-600 rounded-full mr-2"></div>
              <span className="font-bold text-xl text-[#8a1c1c]">
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
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-md text-md font-medium ${
                  isActive(href)
                    ? 'bg-[#6e0903] text-white'
                    : 'text-gray-900 hover:bg-red-100'
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Technical info with dropdown*/}
            <div className="relative">
              <button
                onClick={toggleTechnicalDesktop}
                className={`px-3 py-2 rounded-md text-md font-medium flex items-center gap-1 ${
                  pathname.startsWith('/technical')
                    ? 'bg-[#6e0903] text-white'
                    : 'text-gray-900 hover:bg-red-100'
                }`}
              >
                <Link href="/technical">Technical Info</Link>
              </button>

              {isTechnicalOpenDesktop && (
                <div className="absolute left-0 z-50 bg-white text-black shadow-md mt-2 rounded-md w-64">
                  {technicalSubpages.map((label) => (
                    <Link
                      key={label}
                      href={`/technical/${label
                        .toLowerCase()
                        .replace(/\s+/g, '-')}`}
                      className="block px-4 py-2 hover:bg-red-100 border-b border-gray-200 last:border-b-0"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {[
              { href: '/competition', label: 'Competition' },
              { href: '/media', label: 'Media' },
              { href: '/contact', label: 'Donate', isButton: true },
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
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
            { href: '/team', label: 'Team' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(href)
                  ? 'bg-[#6e0903] text-white'
                  : 'text-gray-900 hover:bg-red-100'
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Technical Info with dropdown for mobile*/}
          <button
            onClick={toggleTechnicalMobile}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-red-100"
          >
            Technical Info
          </button>
          {isTechnicalOpen && (
            <div className="ml-4 space-y-1">
              {technicalSubpages.map((label) => (
                <Link
                  key={label}
                  href={`/technical/${label
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`}
                  className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-red-50"
                >
                  {label}
                </Link>
              ))}
            </div>
          )}

          {[
            { href: '/competition', label: 'Competition' },
            { href: '/media', label: 'Media' },
            { href: '/contact', label: 'Donate', isButton: true },
          ].map(({ href, label, isButton }) => (
            <Link
              key={href}
              href={href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(href)
                  ? 'bg-[#6e0903] text-white'
                  : 'text-gray-900 hover:bg-red-100'
              } ${isButton ? 'bg-red-600 text-white hover:bg-red-700' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
