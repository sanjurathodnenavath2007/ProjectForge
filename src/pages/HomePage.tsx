import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, Compass, Bookmark, ArrowRight, Star, Zap, Target,
  Code2, TrendingUp, Lightbulb, Rocket, Check,
} from 'lucide-react';
import { fetchProjects } from '@/lib/supabase';
import type { Project } from '@/types';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectGridSkeleton } from '@/components/States';
import { CATEGORIES, ALL_TECHNOLOGIES } from '@/types';
import { getCategoryMeta } from '@/lib/meta';

export function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : 'Failed to load projects');
        setLoading(false);
      });
  }, []);

  const featured = projects.slice(0, 6);
  const categoryCounts = CATEGORIES.map((cat) => ({
    cat,
    count: projects.filter((p) => p.category === cat).length,
  }));
  const popularTech = ALL_TECHNOLOGIES.slice(0, 16);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pf-grid-pattern" />
        <div className="absolute inset-0 pf-hero-glow" />
        <div className="relative pf-container py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              Personalized project ideas for CSE students
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl animate-fade-in-up">
              Find your next
              <span className="pf-gradient-text"> build-worthy </span>
              software project
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              ProjectForge curates realistic, challenging software projects tailored to your skills
              and interests. Filter by technology, category, difficulty, and development time to
              discover the perfect project for your portfolio.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <Link to="/generate" className="pf-btn-primary px-6 py-3 text-base">
                <Sparkles className="h-5 w-5" />
                Generate an Idea
              </Link>
              <Link to="/explore" className="pf-btn-secondary px-6 py-3 text-base">
                <Compass className="h-5 w-5" />
                Explore Projects
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            {[
              { icon: Lightbulb, label: 'Project Ideas', value: `${projects.length || '24'}+` },
              { icon: Target, label: 'Categories', value: '8' },
              { icon: Code2, label: 'Technologies', value: '40+' },
              { icon: TrendingUp, label: 'Difficulty Levels', value: '3' },
            ].map((stat) => (
              <div key={stat.label} className="pf-card flex flex-col items-center gap-1 p-4 text-center">
                <stat.icon className="h-5 w-5 text-primary-600" />
                <span className="font-display text-2xl font-bold text-slate-900">{stat.value}</span>
                <span className="text-xs font-medium text-slate-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="pf-container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">How it works</span>
          <h2 className="pf-section-title mt-2">Three ways to find your project</h2>
          <p className="mt-4 text-lg text-slate-600">
            Whether you want a personalized recommendation or prefer browsing the catalog, ProjectForge
            helps you find a project that fits your goals and timeline.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Sparkles,
              title: 'Generate',
              desc: 'Answer a few quick questions about your skills and interests. We match you with a personalized project idea and explain why it fits.',
              link: '/generate',
              linkText: 'Try the Generator',
              color: 'from-primary-500 to-primary-700',
              features: ['Personalized matching', 'Match score & reasoning', 'Alternative suggestions'],
            },
            {
              icon: Compass,
              title: 'Explore',
              desc: 'Browse the full catalog of realistic projects. Filter by technology, category, difficulty, and development time.',
              link: '/explore',
              linkText: 'Browse Projects',
              color: 'from-accent-500 to-accent-700',
              features: ['Search & filter', 'Sort by rating', 'Active filter chips'],
            },
            {
              icon: Bookmark,
              title: 'Save',
              desc: 'Bookmark projects you love and add personal notes. Your saved list is always waiting when you are ready to start building.',
              link: '/saved',
              linkText: 'View Saved',
              color: 'from-violet-500 to-violet-700',
              features: ['One-click bookmark', 'Personal notes', 'Persists across sessions'],
            },
          ].map((step, i) => (
            <div
              key={step.title}
              className="pf-card pf-card-hover group relative p-6 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-white shadow-lg`}>
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.desc}</p>
              <ul className="mt-4 space-y-1.5">
                {step.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-slate-500">
                    <Check className="h-3.5 w-3.5 text-accent-600" strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to={step.link}
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
              >
                {step.linkText}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-slate-200 bg-white py-20">
        <div className="pf-container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">Categories</span>
            <h2 className="pf-section-title mt-2">Explore by domain</h2>
            <p className="mt-4 text-lg text-slate-600">
              From web apps to operating systems, find projects across every domain of computer science.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categoryCounts.map(({ cat, count }, i) => {
              const meta = getCategoryMeta(cat);
              return (
                <Link
                  key={cat}
                  to={`/explore?category=${encodeURIComponent(cat)}`}
                  className="pf-card pf-card-hover group flex flex-col items-center gap-3 p-5 text-center animate-fade-in-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${meta.bg} ${meta.color} transition-transform group-hover:scale-110`}>
                    <meta.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-slate-900">{cat}</p>
                    <p className="text-xs text-slate-500">{count} project{count !== 1 ? 's' : ''}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular technologies */}
      <section className="pf-container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">Tech Stack</span>
          <h2 className="pf-section-title mt-2">Technologies you will work with</h2>
          <p className="mt-4 text-lg text-slate-600">
            Projects use modern, industry-relevant technologies so what you learn translates directly to your career.
          </p>
        </div>
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {popularTech.map((tech, i) => (
            <Link
              key={tech}
              to={`/explore?tech=${encodeURIComponent(tech)}`}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 hover:shadow-md animate-fade-in-up"
              style={{ animationDelay: `${Math.min(i * 30, 400)}ms` }}
            >
              {tech}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="border-t border-slate-200 bg-white py-20">
        <div className="pf-container">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">Featured</span>
              <h2 className="pf-section-title mt-2">Top-rated project ideas</h2>
              <p className="mt-3 text-lg text-slate-600">
                Hand-picked projects to kickstart your next build.
              </p>
            </div>
            <Link
              to="/explore"
              className="pf-btn-secondary px-4 py-2 text-sm"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {error ? (
            <p className="mt-8 text-sm text-error-600">{error}</p>
          ) : loading ? (
            <div className="mt-8"><ProjectGridSkeleton count={6} /></div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pf-container py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 via-primary-800 to-slate-900 px-6 py-16 text-center shadow-2xl shadow-primary-900/20">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(16,185,132,0.4), transparent 50%)' }} />
          <div className="relative">
            <Rocket className="mx-auto h-10 w-10 text-accent-400" />
            <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
              Ready to start building?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
              Generate a personalized project idea in seconds, or explore the full catalog to find
              the one that sparks your curiosity.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/generate" className="pf-btn bg-white px-6 py-3 text-base text-primary-700 hover:bg-primary-50 active:scale-[0.97]">
                <Zap className="h-5 w-5" />
                Generate an Idea
              </Link>
              <Link to="/explore" className="pf-btn border border-white/30 bg-white/10 px-6 py-3 text-base text-white hover:bg-white/20 active:scale-[0.97]">
                <Compass className="h-5 w-5" />
                Explore Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
