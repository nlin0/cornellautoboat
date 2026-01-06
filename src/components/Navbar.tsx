'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  { href: '/sponsors', label: 'Sponsors' },

  {
    href: 'https://securelb.imodules.com/s/1717/giving/interior.aspx?sid=1717&gid=2&pgid=16421&cid=7311&dids=5372&bledit=1',
    label: 'Donate',
    isButton: true,
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTechnicalOpen, setIsTechnicalOpen] = useState(false);
  const [isTechnicalOpenDesktop, setIsTechnicalOpenDesktop] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Map<string, HTMLElement>>(new Map());

  const pathname = usePathname();

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    setIsTechnicalOpen(false);
  }, []);
  const toggleTechnicalMobile = useCallback(
    () => setIsTechnicalOpen((prev) => !prev),
    []
  );

  const handleTechnicalMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsTechnicalOpenDesktop(true);
  }, []);

  const handleTechnicalMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsTechnicalOpenDesktop(false);
    }, 250);
  }, []);

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

  // close mobile menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsTechnicalOpen(false);
  }, [pathname]);

  // update sliding indicator position when pathname changes
  useEffect(() => {
    const updateIndicator = () => {
      if (!indicatorRef.current || !navRef.current) return;

      // find the active link
      let activeLink: HTMLElement | null = null;

      // check main nav links
      for (const { href } of MAIN_NAV_LINKS) {
        if (pathname === href) {
          activeLink = linkRefs.current.get(href) || null;
          break;
        }
      }

      // check technical link
      if (!activeLink && pathname.startsWith('/technical')) {
        activeLink = linkRefs.current.get('/technical') || null;
      }

      // check secondary nav links (excluding buttons)
      if (!activeLink) {
        for (const { href, isButton } of SECONDARY_NAV_LINKS) {
          if (!isButton && pathname === href) {
            activeLink = linkRefs.current.get(href) || null;
            break;
          }
        }
      }

      if (activeLink && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        const left = linkRect.left - navRect.left;
        const top = linkRect.top - navRect.top;
        const width = linkRect.width;
        const height = linkRect.height;

        indicatorRef.current.style.left = `${left}px`;
        indicatorRef.current.style.top = `${top}px`;
        indicatorRef.current.style.width = `${width}px`;
        indicatorRef.current.style.height = `${height}px`;
        indicatorRef.current.style.opacity = '1';
      } else {
        // Hide indicator if no active link
        if (indicatorRef.current) {
          indicatorRef.current.style.opacity = '0';
        }
      }
    };

    // small delay to ensure DOM is updated
    const timer = setTimeout(updateIndicator, 10);
    window.addEventListener('resize', updateIndicator);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [pathname]);

  return (
    <nav
      className="bg-white/80 border-b border-gray-200 fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-lg bg-white/80 backdrop-blur-sm translate-y-0"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-20">
          {/* LOGO */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex-shrink-0 flex items-center gap-3 group transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/CUAB_Logo.png"
              alt="Cornell AutoBoat Logo"
              width={70}
              height={70}
              className="transition-all duration-300 group-hover:scale-110"
              priority
            />
            <span
              className="font-semibold text-lg text-gray-900 tracking-tight transition-colors duration-300 group-hover:text-[#960303]"
              style={{ fontFamily: 'Pirulen, Arial, sans-serif' }}
            >
              Cornell AutoBoat
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav
            ref={navRef}
            className="hidden md:flex items-center space-x-1 relative"
            aria-label="Main navigation"
          >
            {/* SLIDING INDICATOR */}
            <div
              ref={indicatorRef}
              className="absolute border border-[#960303] rounded-md transition-all duration-300 ease-out pointer-events-none"
              style={{
                opacity: 0,
                left: 0,
                top: 0,
                width: 0,
                height: 0,
              }}
            />

            {MAIN_NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                ref={(el) => {
                  if (el) linkRefs.current.set(href, el);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-out relative group ${isActive(href)
                    ? 'text-[#960303]'
                    : 'text-gray-700 hover:text-[#960303] hover:bg-gray-50'
                  } hover:scale-105 active:scale-95`}
              >
                {label}
              </Link>
            ))}

            {/* TECHNICAL DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={handleTechnicalMouseEnter}
              onMouseLeave={handleTechnicalMouseLeave}
            >
              {/* CLICKABLE BUTTON*/}
              <Link
                href="/technical"
                ref={(el) => {
                  if (el) linkRefs.current.set('/technical', el);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors duration-200 ease-out relative group ${pathname.startsWith('/technical')
                    ? 'text-[#960303]'
                    : 'text-gray-700 hover:text-[#960303] hover:bg-gray-50'
                  } hover:scale-105 active:scale-95`}
              >
                Subteams
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isTechnicalOpenDesktop ? 'rotate-180' : ''
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Link>

              {/* DESKTOP DROPDOWN */}
              {isTechnicalOpenDesktop && (
                <div className="absolute left-0 top-full z-50 pt-3">
                  {/* invisible hover bridge */}
                  <div className="absolute top-0 left-0 w-full h-3 -mt-3 pointer-events-none"></div>

                  <div
                    className="bg-white text-gray-900 rounded-lg w-64 shadow-xl border border-gray-200 animate-fadeInDown"
                    role="menu"
                  >
                    {TECHNICAL_SUBPAGES.map((label, index) => {
                      const technicalHref = getTechnicalHref(label);
                      const isTechnicalActive = pathname === technicalHref;
                      return (
                        <Link
                          key={label}
                          href={technicalHref}
                          className={`block px-4 py-2.5 border-b border-gray-100 last:border-b-0 transition-all duration-200 text-sm transform hover:translate-x-1 hover:pl-5 ${isTechnicalActive
                              ? 'text-[#960303] border-l-2 border-l-[#960303] bg-gray-50'
                              : 'hover:bg-gray-50 hover:text-[#960303]'
                            }`}
                          role="menuitem"
                          style={{
                            animation: `fadeInLeft 0.3s ease-out ${index * 0.05
                              }s both`,
                          }}
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* SECONDARY LINKS */}
            {SECONDARY_NAV_LINKS.map(({ href, label, isButton }) => (
              <Link
                key={href}
                href={href}
                ref={(el) => {
                  if (el && !isButton) linkRefs.current.set(href, el);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-out relative group ${isActive(href) && !isButton
                    ? 'text-[#960303]'
                    : isButton
                      ? 'bg-[#960303] text-white hover:bg-[#7d0000] shadow-md hover:shadow-lg hover:shadow-red-600/50 font-semibold ml-2 px-5 py-2.5 hover:scale-110 active:scale-95'
                      : 'text-gray-700 hover:text-[#960303] hover:bg-gray-50 hover:scale-105 active:scale-95'
                  }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor">
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

      {/* MOBILE NAV */}
      {isMenuOpen && (
        <nav className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {MAIN_NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(href)
                ? 'text-[#960303] border border-[#960303]'
                : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              {label}
            </Link>
          ))}

          {/* TECHNICAL MOBILE DROPDOWN */}
          <button
            type="button"
            onClick={toggleTechnicalMobile}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            Subteams
          </button>

          {isTechnicalOpen && (
            <div className="ml-4 space-y-1">
              {TECHNICAL_SUBPAGES.map((label) => {
                const technicalHref = getTechnicalHref(label);
                const isTechnicalActive = pathname === technicalHref;
                return (
                  <Link
                    key={label}
                    href={technicalHref}
                    onClick={closeMenu}
                    className={`block px-3 py-2 rounded-md text-sm ${isTechnicalActive
                        ? 'text-[#960303] border border-[#960303]'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#960303]'
                      }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          )}

          {SECONDARY_NAV_LINKS.map(({ href, label, isButton }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(href) && !isButton
                ? 'text-[#960303] border border-[#960303]'
                : isButton
                  ? 'bg-[#960303] text-white hover:bg-[#7d0000] font-semibold mt-2'
                  : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </nav>
  );
}
