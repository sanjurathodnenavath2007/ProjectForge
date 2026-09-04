import { Link } from 'react-router-dom';
import {
  Hammer, Sparkles, Compass, Bookmark, Target, Users, Lightbulb, Code2,
  ArrowRight, GraduationCap, Rocket, Heart, User,
} from 'lucide-react';
import { CATEGORIES } from '@/types';
import { getCategoryMeta } from '@/lib/meta';

export function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 pf-grid-pattern" />
        <div className="absolute inset-0 pf-hero-glow" />
        <div className="relative pf-container py-20 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
              <GraduationCap className="h-4 w-4" />
              Built for CSE students, by engineers who have been there
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              About <span className="pf-gradient-text">ProjectForge</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              ProjectForge is a curated platform that helps computer science students discover
              personalized, realistic software project ideas. We believe the right project can
              spark a lifelong passion for building.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="pf-container py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="pf-section-title">Our mission</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Every computer science student faces the same question: &ldquo;What should I build?&rdquo;
              The options are endless, but finding a project that is challenging enough to learn
              from, realistic enough to finish, and aligned with your interests is surprisingly hard.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              ProjectForge solves this by curating a catalog of build-worthy projects and matching
              them to your skills, interests, and available time. Every project includes a detailed
              description, a realistic tech stack, and key features to guide your development.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/generate" className="pf-btn-primary px-5 py-2.5">
                <Sparkles className="h-5 w-5" />
                Generate an Idea
              </Link>
              <Link to="/explore" className="pf-btn-secondary px-5 py-2.5">
                <Compass className="h-5 w-5" />
                Explore Projects
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Target, label: 'Curated', value: '24+', sub: 'Realistic projects', color: 'text-primary-600', bg: 'bg-primary-50' },
              { icon: Code2, label: 'Technologies', value: '40+', sub: 'Across the stack', color: 'text-accent-600', bg: 'bg-accent-50' },
              { icon: Lightbulb, label: 'Categories', value: '8', sub: 'Domains of CS', color: 'text-violet-600', bg: 'bg-violet-50' },
              { icon: Rocket, label: 'Difficulty', value: '3', sub: 'Levels of challenge', color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map((stat) => (
              <div key={stat.label} className="pf-card p-5">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <p className="mt-3 font-display text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm font-medium text-slate-700">{stat.label}</p>
                <p className="text-xs text-slate-400">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-slate-200 bg-white py-20">
        <div className="pf-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="pf-section-title">What makes ProjectForge different</h2>
            <p className="mt-4 text-lg text-slate-600">
              We focus on quality over quantity, with projects designed to teach real skills.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: 'Personalized Matching',
                desc: 'The generator asks about your skills, interests, and available time, then matches you with a project that fits.',
              },
              {
                icon: Target,
                title: 'Realistic Projects',
                desc: 'Every project is scoped to be challenging but completable, with a realistic tech stack and clear feature list.',
              },
              {
                icon: Compass,
                title: 'Smart Filtering',
                desc: 'Filter the full catalog by technology, category, difficulty, and development time to find exactly what you need.',
              },
              {
                icon: Bookmark,
                title: 'Save and Annotate',
                desc: 'Bookmark projects and add personal notes so you can track your ideas and plans across sessions.',
              },
              {
                icon: Code2,
                title: 'Real Tech Stacks',
                desc: 'Projects use modern, industry-relevant technologies so what you learn translates directly to your career.',
              },
              {
                icon: GraduationCap,
                title: 'Built for Students',
                desc: 'Designed specifically for CSE students looking for portfolio-worthy projects that demonstrate real skills.',
              },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className="pf-card pf-card-hover p-6 animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="pf-container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="pf-section-title">Categories we cover</h2>
          <p className="mt-4 text-lg text-slate-600">
            From web apps to operating systems, our catalog spans the breadth of computer science.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CATEGORIES.map((cat, i) => {
            const meta = getCategoryMeta(cat);
            return (
              <Link
                key={cat}
                to={`/explore?category=${encodeURIComponent(cat)}`}
                className="pf-card pf-card-hover group flex items-center gap-3 p-4 animate-fade-in-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${meta.bg} ${meta.color} transition-transform group-hover:scale-110`}>
                  <meta.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-slate-900">{cat}</p>
                  <p className="text-xs text-slate-500">Browse projects</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="pf-container pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm sm:p-16">
          <div className="absolute inset-0 pf-hero-glow opacity-50" />
          <div className="relative">
            <Hammer className="mx-auto h-10 w-10 text-primary-600" />
            <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Start your next project today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
              Join the students who use ProjectForge to find build-worthy projects that level up
              their skills and portfolios.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/generate" className="pf-btn-primary px-6 py-3 text-base">
                <Sparkles className="h-5 w-5" />
                Generate an Idea
              </Link>
              <Link to="/explore" className="pf-btn-secondary px-6 py-3 text-base">
                <Compass className="h-5 w-5" />
                Browse Catalog
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Creator */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="pf-container">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 text-white shadow-lg shadow-primary-600/20">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">Created by Sanju Rathod</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                ProjectForge was built by Sanju Rathod to help fellow computer science students
                discover meaningful, portfolio-worthy projects and grow as engineers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credits */}
      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="pf-container flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2 text-slate-600">
            <Heart className="h-4 w-4 fill-rose-400 text-rose-400" />
            <span className="text-sm">Crafted with care for the next generation of engineers</span>
          </div>
          <p className="text-xs text-slate-400">
            ProjectForge &copy; {new Date().getFullYear()} — Built by Sanju Rathod.
          </p>
        </div>
      </section>
    </div>
  );
}
