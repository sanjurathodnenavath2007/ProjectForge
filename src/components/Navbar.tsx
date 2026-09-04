import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Hammer, Menu, X, Bookmark, Sparkles, Compass, Home, Info } from 'lucide-react';
import { useSaved } from '@/context/SavedContext';

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/generate', label: 'Generator', icon: Sparkles },
  { to: '/explore', label: 'Explore', icon: Compass },
  { to: '/saved', label: 'Saved', icon: Bookmark },
  { to: '/about', label: 'About', icon: Info },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { saved } = useSaved();
  const savedCount = saved.length;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-lg">
      <nav className="pf-container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 text-white shadow-lg shadow-primary-600/20">
            <Hammer className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-slate-900">
            Project<span className="text-primary-600">Forge</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              {item.to === '/saved' && savedCount > 0 && (
                <span className="ml-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary-600 px-1.5 text-xs font-semibold text-white">
                  {savedCount}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Link to="/generate" className="pf-btn-primary px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4" />
            Get an Idea
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="pf-btn-ghost p-2 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="pf-container flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {item.to === '/saved' && savedCount > 0 && (
                  <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary-600 px-1.5 text-xs font-semibold text-white">
                    {savedCount}
                  </span>
                )}
              </NavLink>
            ))}
            <Link
              to="/generate"
              onClick={() => setMobileOpen(false)}
              className="pf-btn-primary mt-2 px-4 py-2.5 text-sm"
            >
              <Sparkles className="h-4 w-4" />
              Get an Idea
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
