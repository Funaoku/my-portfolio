import Link from 'next/link';

const Header = () => (
  <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold">nemuri</Link>
      <div className="flex gap-6">
        <Link href="/#about" className="hover:text-gray-600 dark:hover:text-gray-300">About</Link>
        <Link href="/#projects" className="hover:text-gray-600 dark:hover:text-gray-300">Projects</Link>
        <Link href="/#contact" className="hover:text-gray-600 dark:hover:text-gray-300">Contact</Link>
      </div>
    </nav>
  </header>
);

export default Header; 