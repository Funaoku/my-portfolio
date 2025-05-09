export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-xl font-bold">nemuri</div>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-gray-600 dark:hover:text-gray-300">About</a>
            <a href="#projects" className="hover:text-gray-600 dark:hover:text-gray-300">Projects</a>
            <a href="#contact" className="hover:text-gray-600 dark:hover:text-gray-300">Contact</a>
          </div>
        </nav>
      </header>

      {/* メインコンテンツ */}
      <main className="pt-16">
        {/* ヒーローセクション */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Welcome to My Portfolio
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              とある駆け出しエンジニアのポートフォリオ
            </p>
            <a
              href="#contact"
              className="inline-block bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </a>
          </div>
        </section>

        {/* About セクション */}
        <section id="about" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">About Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  非情報系の大学院生
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">Next.js</span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">TypeScript</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects セクション */}
        <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* プロジェクトカード */}
              <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Project Title</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    
                  </p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">React</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">Next.js</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact セクション */}
        <section id="contact" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Contact</h2>
            <div className="max-w-xl mx-auto">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} nemuri. All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
