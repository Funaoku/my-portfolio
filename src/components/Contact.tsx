'use client'

import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // ここにフォーム送信ロジックを追加
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Contact
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors duration-300"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors duration-300"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors duration-300 resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
        
        <div className="mt-12 text-center">
          <p className="text-gray-400">
            または、直接メールでお問い合わせください
          </p>
          <a
            href="mailto:your-email@example.com"
            className="text-white hover:text-gray-300 transition-colors duration-300 mt-2 inline-block"
          >
            your-email@example.com
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact