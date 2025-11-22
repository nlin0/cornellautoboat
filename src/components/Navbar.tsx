'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  href: string;
  label: string;
  isButton?: boolean;
}

const TECHNICAL_SUBPAGES = [
  'Perception',
  'Artificial Intelligence',
  'Controls & Microcontroller Designs',
  'ROS & Simulations',
  'Mechanical',
  'Robotics',
  'Electrical Systems',
] as const;

const MAIN_NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Team' },
];

const SECONDARY_NAV_LINKS: NavLink[] = [
  { href: '/competition', label: 'Competition' },
  { href: '/media', label: 'Media' },
  { href: '/contact', label: 'Donate', isButton: true },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTechnicalOpen, setIsTechnicalOpen] = useState(false);
  const [isTechnicalOpenDesktop, setIsTechnicalOpenDesktop] = useState(false);

  const pathname = usePathname();

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const toggleTechnicalMobile = useCallback(() => setIsTechnicalOpen((prev) => !prev), []);
  const handleTechnicalMouseEnter = useCallback(() => setIsTechnicalOpenDesktop(true), []);
  const handleTechnicalMouseLeave = useCallback(() => setIsTechnicalOpenDesktop(false), []);

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  const getTechnicalHref = (label: string) => 
    `/technical/${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <nav className="bg-[#FDFFFC] shadow-md sticky top-0 z-50">
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
          <nav className="hidden md:flex items-center space-x-4" aria-label="Main navigation">
            {MAIN_NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-md text-md font-medium transition-colors ${
                  isActive(href)
                    ? 'bg-[#6e0903] text-white'
                    : 'text-gray-900 hover:bg-red-100'
                }`}
                aria-current={isActive(href) ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}

            {/* Technical info with dropdown */}
            <div
              className="relative"
              onMouseEnter={handleTechnicalMouseEnter}
              onMouseLeave={handleTechnicalMouseLeave}
            >
              <button
                type="button"
                className={`px-3 py-2 rounded-md text-md font-medium flex items-center gap-1 transition-colors ${
                  pathname.startsWith('/technical')
                    ? 'bg-[#6e0903] text-white'
                    : 'text-gray-900 hover:bg-red-100'
                }`}
                aria-expanded={isTechnicalOpenDesktop}
                aria-haspopup="true"
                aria-label="Technical Information"
              >
                Technical Info
              </button>

              {isTechnicalOpenDesktop && (
                <div
                  className="absolute left-0 top-full z-50 bg-white text-black mt-0 rounded-md w-64 shadow-lg"
                  role="menu"
                >
                  {TECHNICAL_SUBPAGES.map((label) => (
                    <Link
                      key={label}
                      href={getTechnicalHref(label)}
                      className="block px-4 py-2 hover:bg-red-100 border-b border-gray-200 last:border-b-0 transition-colors"
                      role="menuitem"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {SECONDARY_NAV_LINKS.map(({ href, label, isButton }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-md text-md font-medium transition-colors ${
                  isActive(href)
                    ? 'bg-[#6e0903] text-white'
                    : 'text-gray-900 hover:bg-red-100'
                } ${isButton ? 'bg-[#7d2c20] text-white hover:bg-red-700' : ''}`}
                aria-current={isActive(href) ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 transition-colors"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3" aria-label="Mobile navigation">
          {MAIN_NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive(href)
                  ? 'bg-[#6e0903] text-white'
                  : 'text-gray-900 hover:bg-red-100'
              }`}
              aria-current={isActive(href) ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}

          {/* Technical Info with dropdown for mobile */}
          <button
            type="button"
            onClick={toggleTechnicalMobile}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-red-100 transition-colors"
            aria-expanded={isTechnicalOpen}
            aria-haspopup="true"
          >
            Technical Info
          </button>
          {isTechnicalOpen && (
            <div className="ml-4 space-y-1" role="menu">
              {TECHNICAL_SUBPAGES.map((label) => (
                <Link
                  key={label}
                  href={getTechnicalHref(label)}
                  className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-red-50 transition-colors"
                  role="menuitem"
                >
                  {label}
                </Link>
              ))}
            </div>
          )}

          {SECONDARY_NAV_LINKS.map(({ href, label, isButton }) => (
            <Link
              key={href}
              href={href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive(href)
                  ? 'bg-[#6e0903] text-white'
                  : 'text-gray-900 hover:bg-red-100'
              } ${isButton ? 'bg-red-600 text-white hover:bg-red-700' : ''}`}
              aria-current={isActive(href) ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </nav>
  );
}
