'use client'

import { useState, useEffect } from 'react'

const Hero = () => {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const textArray = [
    '駆け出しエンジニア',
    'Web Developer',
    'Problem Solver',
    'Creative Thinker'
  ]

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % textArray.length
      const fullText = textArray[i]

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      )

      setTypingSpeed(isDeleting ? 50 : 150)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
          Welcome to My Portfolio
        </h1>
        <div className="text-2xl md:text-4xl text-gray-600 mb-8 h-12">
          I&apos;m a <span className="font-bold text-black">{text}</span>
          <span className="animate-blink">|</span>
        </div>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
          とある駆け出しエンジニアのポートフォリオ
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 hover:shadow-lg"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border-2 border-black text-black font-semibold rounded-full hover:bg-black hover:text-white transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero