'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            nemuri
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-black transition-colors duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col space-y-1"
          >
            <span
              className={`block w-6 h-0.5 bg-gray-900 transition-transform ${
                mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-900 transition-opacity ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-900 transition-transform ${
                mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-64' : 'max-h-0'
        } overflow-hidden bg-white`}
      >
        <div className="px-4 py-2 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:text-black transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation