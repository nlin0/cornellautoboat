
'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface NavLink {
  href: string;
  label: string;
  isButton?: boolean;
}

const TECHNICAL_SUBPAGES = [
  'Perception',
  'Autonomy',
  /* 'Controls', */
  'Simulations',
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
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSdyiXnXFlgKNF2EGi1rpWyEKVNZUpvFJ9kd6S65DNz0Vs_xIg/viewform',
    label: 'Apply Now',
    isButton: true,
  },
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
  const navRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Map<string, HTMLElement>>(new Map());

  const pathname = usePathname();
  const { status } = useSession();
  const isLoggedIn = status === 'authenticated';

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    setIsTechnicalOpen(false);
  }, []);

  const toggleTechnicalMobile = useCallback(() => {
    setIsTechnicalOpen((prev) => !prev);
  }, []);

  const handleTechnicalMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsTechnicalOpenDesktop(true);
  }, []);

  const handleTechnicalMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsTechnicalOpenDesktop(false);
    }, 200);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const isActive = useCallback(
    (path: string) => path === pathname,
    [pathname]
  );

  const getTechnicalHref = (label: string) =>
    `/technical/${label.toLowerCase().replace(/\s+/g, '-')}`;

  useEffect(() => {
    setIsMenuOpen(false);
    setIsTechnicalOpen(false);
  }, [pathname]);

  useEffect(() => {
    const updateIndicator = () => {
      if (!indicatorRef.current || !navRef.current) return;

      let activeLink: HTMLElement | null = null;

      for (const { href } of MAIN_NAV_LINKS) {
        if (pathname === href) {
          activeLink = linkRefs.current.get(href) || null;
          break;
        }
      }

      if (!activeLink && pathname.startsWith('/technical')) {
        activeLink = linkRefs.current.get('/technical') || null;
      }

      if (!activeLink) {
        for (const { href, isButton } of SECONDARY_NAV_LINKS) {
          if (!isButton && pathname === href) {
            activeLink = linkRefs.current.get(href) || null;
            break;
          }
        }
      }

      if (activeLink) {
        const navRect = navRef.current.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        indicatorRef.current.style.left = `${linkRect.left - navRect.left}px`;
        indicatorRef.current.style.top = `${linkRect.top - navRect.top}px`;
        indicatorRef.current.style.width = `${linkRect.width}px`;
        indicatorRef.current.style.height = `${linkRect.height}px`;
        indicatorRef.current.style.opacity = '1';
      } else {
        indicatorRef.current.style.opacity = '0';
      }
    };

    const timer = setTimeout(updateIndicator, 10);

    window.addEventListener('resize', updateIndicator);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      
      {/* NAV CONTAINER */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[76px]">

          {/* LOGO */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <Image
              src="/CUAB_Logo.png"
              alt="Cornell AutoBoat Logo"
              width={58}
              height={58}
              className="transition-transform duration-200 group-hover:scale-105"
              priority
            />

            <span
              className="font-semibold text-[17px] tracking-tight text-gray-900 group-hover:text-[#960303] transition-colors duration-200 whitespace-nowrap"
              style={{ fontFamily: 'Pirulen, Arial, sans-serif' }}
            >
              Cornell AutoBoat
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div
            ref={navRef}
            className="hidden md:flex items-center gap-1 relative ml-auto"
            aria-label="Main navigation"
          >

            {/* SLIDING INDICATOR */}
            <div
              ref={indicatorRef}
              className="absolute border border-[#960303]/60 rounded-lg transition-all duration-300 ease-out pointer-events-none"
              style={{
                opacity: 0,
                left: 0,
                top: 0,
                width: 0,
                height: 0,
              }}
            />

            {/* MAIN LINKS */}
            {MAIN_NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                ref={(el) => {
                  if (el) {
                    linkRefs.current.set(href, el);
                  }
                }}
                className={`relative z-10 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive(href)
                    ? 'text-[#960303]'
                    : 'text-gray-700 hover:text-[#960303]'
                }`}
              >
                {label}
              </Link>
            ))}

            {/* SUBTEAMS */}
            <div
              className="relative z-20"
              onMouseEnter={handleTechnicalMouseEnter}
              onMouseLeave={handleTechnicalMouseLeave}
            >
              <Link
                href="/technical"
                ref={(el) => {
                  if (el) {
                    linkRefs.current.set('/technical', el);
                  }
                }}
                className={`relative z-10 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors duration-200 ${
                  pathname.startsWith('/technical')
                    ? 'text-[#960303]'
                    : 'text-gray-700 hover:text-[#960303]'
                }`}
              >
                Subteams

                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isTechnicalOpenDesktop ? 'rotate-180' : ''
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

              {/* DROPDOWN */}
              {isTechnicalOpenDesktop && (
                <div className="absolute left-0 top-full pt-3">
                  <div className="w-60 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
                    
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Technical Subteams
                      </p>
                    </div>

                    {TECHNICAL_SUBPAGES.map((label) => {
                      const technicalHref = getTechnicalHref(label);
                      const isTechnicalActive =
                        pathname === technicalHref;

                      return (
                        <Link
                          key={label}
                          href={technicalHref}
                          className={`flex items-center px-4 py-2.5 text-sm transition-colors duration-150 ${
                            isTechnicalActive
                              ? 'text-[#960303] bg-red-50 font-medium'
                              : 'text-gray-700 hover:text-[#960303] hover:bg-gray-50'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full mr-3 ${
                              isTechnicalActive
                                ? 'bg-[#960303]'
                                : 'bg-gray-300'
                            }`}
                          />
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
                  if (el && !isButton) {
                    linkRefs.current.set(href, el);
                  }
                }}
                className={
                  isButton
                    ? label === 'Apply Now'
                      ? 'ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[#960303] text-white hover:bg-[#7d0000] transition-colors duration-200 shadow-sm'
                      : 'ml-1 px-3 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:border-[#960303] hover:text-[#960303] transition-colors duration-200'
                    : `relative z-10 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        isActive(href)
                          ? 'text-[#960303]'
                          : 'text-gray-700 hover:text-[#960303]'
                      }`
                }
              >
                {label}
              </Link>
            ))}

            {/* COFFEE CHAT */}
            <Link
              href="/coffeechat"
              className={`ml-1 px-3 py-2 rounded-lg text-sm font-medium border transition-colors duration-200 ${
                pathname === '/coffeechat'
                  ? 'border-[#960303] text-[#960303] bg-red-50'
                  : 'border-gray-200 text-gray-700 hover:border-[#960303] hover:text-[#960303]'
              }`}
            >
              Coffee Chat
            </Link>

            {/* ADMIN */}
            {isLoggedIn && (
              <Link
                href="/admin"
                className={`ml-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  pathname.startsWith('/admin')
                    ? 'text-[#960303] bg-red-50'
                    : 'text-gray-700 hover:text-[#960303] hover:bg-gray-50'
                }`}
              >
                Admin
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="p-2 rounded-lg text-gray-600 hover:text-[#960303] hover:bg-gray-100 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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

      {/* MOBILE NAV */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1 shadow-lg">

          {MAIN_NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                isActive(href)
                  ? 'text-[#960303] bg-red-50'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {label}
            </Link>
          ))}

          {/* MOBILE SUBTEAMS */}
          <button
            type="button"
            onClick={toggleTechnicalMobile}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors ${
              pathname.startsWith('/technical')
                ? 'text-[#960303] bg-red-50'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>Subteams</span>

            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                isTechnicalOpen ? 'rotate-180' : ''
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
          </button>

          {isTechnicalOpen && (
            <div className="ml-3 pl-3 border-l-2 border-gray-100 space-y-1">
              {TECHNICAL_SUBPAGES.map((label) => {
                const technicalHref = getTechnicalHref(label);
                const isTechnicalActive =
                  pathname === technicalHref;

                return (
                  <Link
                    key={label}
                    href={technicalHref}
                    onClick={closeMenu}
                    className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      isTechnicalActive
                        ? 'text-[#960303] bg-red-50 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#960303]'
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          )}

          {/* SECONDARY LINKS */}
          {SECONDARY_NAV_LINKS.map(({ href, label, isButton }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                isButton
                  ? label === 'Apply Now'
                    ? 'bg-[#960303] text-white hover:bg-[#7d0000] font-semibold mt-2'
                    : 'border border-gray-300 text-gray-700 hover:border-[#960303] hover:text-[#960303] mt-1'
                  : isActive(href)
                  ? 'text-[#960303] bg-red-50'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {label}
            </Link>
          ))}

          {/* COFFEE CHAT */}
          <Link
            href="/coffeechat"
            onClick={closeMenu}
            className={`block px-4 py-3 rounded-lg text-base font-medium border transition-colors mt-1 ${
              pathname === '/coffeechat'
                ? 'border-[#960303] text-[#960303] bg-red-50'
                : 'border-gray-200 text-gray-700 hover:border-[#960303] hover:text-[#960303]'
            }`}
          >
            Coffee Chat
          </Link>

          {/* ADMIN */}
          {isLoggedIn && (
            <Link
              href="/admin"
              onClick={closeMenu}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                pathname.startsWith('/admin')
                  ? 'text-[#960303] bg-red-50'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Admin
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

