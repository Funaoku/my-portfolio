const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', icon: '⚛️' },
        { name: 'Next.js', icon: '▲' },
        { name: 'TypeScript', icon: '📘' },
        { name: 'Tailwind CSS', icon: '🎨' },
        { name: 'HTML/CSS', icon: '🌐 ' },
      ]
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', icon: '🟢' },
        { name: 'Python', icon: '🐍' },
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'Supabase', icon: '⚡' },
      ]
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git/GitHub', icon: '🐙' },
        { name: 'VS Code', icon: '💻' },
        { name: 'Figma', icon: '🎯' },
        { name: 'Vercel', icon: '🚀' },
      ]
    }
  ]

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
          Skills
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center space-x-3 text-gray-700 hover:text-black transition-colors duration-300"
                  >
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="text-lg">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
