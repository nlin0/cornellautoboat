'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pathname = usePathname();

  // Handle scroll for navbar animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const toggleTechnicalMobile = useCallback(() => setIsTechnicalOpen((prev) => !prev), []);

  const handleTechnicalMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsTechnicalOpenDesktop(true);
  }, []);

  const handleTechnicalMouseLeave = useCallback(() => {
    // Add a small delay before closing to allow mouse movement to dropdown
    timeoutRef.current = setTimeout(() => {
      setIsTechnicalOpenDesktop(false);
    }, 150);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  const getTechnicalHref = (label: string) =>
    `/technical/${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <nav className={`bg-white/80 border-b border-gray-200 sticky top-5 z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-lg bg-white/80 backdrop-blur-sm' : 'shadow-sm'
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex-shrink-0 flex items-center gap-3 group transition-transform duration-300 hover:scale-105"
            >
              <div className="h-10 w-10 bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#7d0000] group-hover:shadow-lg group-hover:shadow-red-600/50 group-hover:scale-110">
                <span className="text-white text-xs font-bold transition-transform duration-300 group-hover:rotate-12">CA</span>
              </div>
              <span className="font-semibold text-lg text-gray-900 tracking-tight transition-colors duration-300 group-hover:text-[#960303]" style={{ fontFamily: 'Pirulen, Arial, sans-serif' }}>
                Cornell AutoBoat
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main navigation">
            {MAIN_NAV_LINKS.map(({ href, label }, index) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 relative group ${isActive(href)
                  ? 'bg-[#960303] text-white shadow-md'
                  : 'text-gray-700 hover:text-[#960303] hover:bg-gray-50'
                  }`}
                aria-current={isActive(href) ? 'page' : undefined}
                style={{
                  animation: `fadeInDown 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                {label}
                {!isActive(href) && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#960303] transition-all duration-300 group-hover:w-full"></span>
                )}
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
                className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-all duration-300 transform hover:scale-105 relative group ${pathname.startsWith('/technical')
                  ? 'bg-[#960303] text-white shadow-md'
                  : 'text-gray-700 hover:text-[#960303] hover:bg-gray-50'
                  }`}
                aria-expanded={isTechnicalOpenDesktop}
                aria-haspopup="true"
                aria-label="Technical Information"
              >
                Technical Info
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${isTechnicalOpenDesktop ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {!pathname.startsWith('/technical') && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#960303] transition-all duration-300 group-hover:w-full"></span>
                )}
              </button>

              {isTechnicalOpenDesktop && (
                <div
                  className="absolute left-0 top-full z-50 bg-white text-gray-900 pt-1 rounded-lg w-64 shadow-xl border border-gray-200 animate-fadeInDown"
                  role="menu"
                  onMouseEnter={handleTechnicalMouseEnter}
                  onMouseLeave={handleTechnicalMouseLeave}
                  style={{
                    animation: 'fadeInDown 0.3s ease-out'
                  }}
                >
                  {TECHNICAL_SUBPAGES.map((label, index) => (
                    <Link
                      key={label}
                      href={getTechnicalHref(label)}
                      className="block px-4 py-2.5 hover:bg-gray-50 hover:text-[#960303] border-b border-gray-100 last:border-b-0 transition-all duration-200 text-sm transform hover:translate-x-1 hover:pl-5"
                      role="menuitem"
                      style={{
                        animation: `fadeInLeft 0.3s ease-out ${index * 0.05}s both`
                      }}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {SECONDARY_NAV_LINKS.map(({ href, label, isButton }, index) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 relative group ${isActive(href)
                  ? 'bg-[#960303] text-white shadow-md'
                  : isButton
                    ? 'bg-[#960303] text-white hover:bg-[#7d0000] shadow-md hover:shadow-lg hover:shadow-red-600/50 font-semibold ml-2 px-5 py-2.5 hover:scale-110'
                    : 'text-gray-700 hover:text-[#960303] hover:bg-gray-50'
                  }`}
                aria-current={isActive(href) ? 'page' : undefined}
                style={{
                  animation: `fadeInDown 0.5s ease-out ${(MAIN_NAV_LINKS.length + 1 + index) * 0.1}s both`
                }}
              >
                {label}
                {!isActive(href) && !isButton && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#960303] transition-all duration-300 group-hover:w-full"></span>
                )}
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
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive(href)
                ? 'bg-[#960303] text-white'
                : 'text-gray-700 hover:bg-gray-50'
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
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
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
                  className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50 hover:text-[#960303] transition-colors"
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
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all ${isActive(href)
                ? 'bg-[#960303] text-white shadow-md'
                : isButton
                  ? 'bg-[#960303] text-white hover:bg-[#7d0000] shadow-md hover:shadow-lg font-semibold mt-2'
                  : 'text-gray-700 hover:bg-gray-50'
                }`}
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
