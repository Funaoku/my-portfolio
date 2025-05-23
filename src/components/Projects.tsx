'use client'

import { useState } from 'react'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
}

const Projects = () => {
  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: '100 Days Challenge',
      description: '100日間、毎日コーディングに取り組むチャレンジ。基礎から応用まで幅広く学習し、様々な技術を実践的に習得。',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/Funaoku/my-portfolio',
      liveUrl: '/challenges',
    },
    // 後で追加できるように配列構造にしています
  ])

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
          Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  💻
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      className="flex-1 text-center py-2 border border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-300"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="flex-1 text-center py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* プロジェクト追加用のプレースホルダー */}
          <div className="bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center min-h-[400px] border-2 border-dashed border-gray-300">
            <div className="text-center p-6">
              <span className="text-4xl text-gray-400">➕</span>
              <p className="text-gray-500 mt-2">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects