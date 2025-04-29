// src/components/Footer.jsx
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full bg-transparent text-white text-center py-6">
      <div className="flex flex-col items-center justify-center space-y-2">
        <a
          href="https://github.com/taniql/Weather-App"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline"
        >
          <FaGithub className="text-2xl" />
          <span>View on GitHub</span>
        </a>
        <p className="text-sm">&copy; {new Date().getFullYear()} Tania Quispe Lazo</p>
      </div>
    </footer>
  );
}
