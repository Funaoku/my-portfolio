'use client'

import { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  )
}