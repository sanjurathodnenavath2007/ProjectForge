import { Link } from 'react-router-dom';
import { Hammer, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="pf-container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 text-white">
                <Hammer className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-slate-900">
                Project<span className="text-primary-600">Forge</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-500">
              ProjectForge helps computer science students discover personalized software project
              ideas with smart filters and a curated catalog of realistic, build-worthy projects.
            </p>
            <p className="mt-2 text-xs text-slate-400">Built by Sanju Rathod</p>
            <div className="mt-5 flex items-center gap-3">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-primary-300 hover:text-primary-600"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/explore" className="text-slate-500 hover:text-primary-600 transition-colors">Browse Projects</Link></li>
              <li><Link to="/generate" className="text-slate-500 hover:text-primary-600 transition-colors">Project Generator</Link></li>
              <li><Link to="/saved" className="text-slate-500 hover:text-primary-600 transition-colors">Saved Projects</Link></li>
              <li><Link to="/about" className="text-slate-500 hover:text-primary-600 transition-colors">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Categories</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/explore?category=Web" className="text-slate-500 hover:text-primary-600 transition-colors">Web Development</Link></li>
              <li><Link to="/explore?category=AI/ML" className="text-slate-500 hover:text-primary-600 transition-colors">AI & Machine Learning</Link></li>
              <li><Link to="/explore?category=Mobile" className="text-slate-500 hover:text-primary-600 transition-colors">Mobile Apps</Link></li>
              <li><Link to="/explore?category=Security" className="text-slate-500 hover:text-primary-600 transition-colors">Cybersecurity</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-6 sm:flex-row">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} ProjectForge. Built for CSE students.
          </p>
          <p className="text-xs text-slate-400">
            Crafted with care for the next generation of engineers.
          </p>
        </div>
      </div>
    </footer>
  );
}
