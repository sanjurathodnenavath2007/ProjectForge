import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, Clock, Star, Bookmark, Share2, Check, Code2, ListChecks,
  Sparkles, Compass, FileText, Copy, BookOpen,
} from 'lucide-react';
import { fetchProjectBySlug, fetchProjects } from '@/lib/supabase';
import type { Project } from '@/types';
import { useSaved } from '@/context/SavedContext';
import { getCategoryMeta, getDifficultyMeta } from '@/lib/meta';
import { ProjectCard } from '@/components/ProjectCard';
import { generateResumeDescription } from '@/lib/matching';

export function ProjectDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [related, setRelated] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [resumeCopied, setResumeCopied] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const { isSaved, toggleSave } = useSaved();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    setProject(null);
    setShowResume(false);
    Promise.all([fetchProjectBySlug(slug), fetchProjects()])
      .then(([p, all]) => {
        setProject(p);
        if (p) {
          setRelated(
            all.filter((x) => x.id !== p.id && x.category === p.category).slice(0, 3),
          );
        }
        setLoading(false);
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : 'Failed to load project');
        setLoading(false);
      });
  }, [slug]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: project?.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // user dismissed share
    }
  };

  const handleCopyResume = async () => {
    if (!project) return;
    try {
      await navigator.clipboard.writeText(generateResumeDescription(project));
      setResumeCopied(true);
      setTimeout(() => setResumeCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  if (loading) {
    return (
      <div className="pf-container py-12">
        <div className="animate-pulse">
          <div className="pf-skeleton mb-4 h-5 w-24 rounded-lg" />
          <div className="pf-skeleton mb-6 h-9 w-2/3 rounded-xl" />
          <div className="pf-skeleton mb-8 aspect-[21/9] w-full rounded-2xl" />
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="pf-skeleton h-4 w-full rounded-lg" />
              ))}
            </div>
            <div className="pf-skeleton h-64 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pf-container py-20">
        <div className="mx-auto max-w-md text-center">
          <h1 className="font-display text-2xl font-bold text-slate-900">
            {error ? 'Something went wrong' : 'Project not found'}
          </h1>
          <p className="mt-2 text-slate-600">
            {error ?? 'The project you are looking for does not exist or has been removed.'}
          </p>
          <Link to="/explore" className="pf-btn-primary mt-6 px-5 py-2.5">
            <Compass className="h-4 w-4" />
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const catMeta = getCategoryMeta(project.category);
  const diffMeta = getDifficultyMeta(project.difficulty);
  const saved = isSaved(project.id);
  const resumeText = generateResumeDescription(project);

  return (
    <div className="animate-fade-in">
      {/* Hero image */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        {project.image_url ? (
          <img src={project.image_url} alt={project.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-600 to-accent-600">
            <catMeta.icon className="h-20 w-20 text-white/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-slate-900/20" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="pf-container pb-8">
            <Link
              to="/explore"
              className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Explore
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`pf-badge ${catMeta.bg} ${catMeta.color}`}>
                <catMeta.icon className="h-3.5 w-3.5" />
                {project.category}
              </span>
              <span className={`pf-badge ${diffMeta.bg} ${diffMeta.color} ring-1 ${diffMeta.ring}`}>
                {project.difficulty}
              </span>
              <span className="pf-badge bg-white/15 text-white backdrop-blur-sm">
                <Clock className="h-3.5 w-3.5" />
                {project.development_time}
              </span>
              <span className="pf-badge bg-white/15 text-white backdrop-blur-sm">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {project.rating.toFixed(1)}
              </span>
            </div>
            <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-slate-200">{project.tagline}</p>
          </div>
        </div>
      </div>

      <div className="pf-container py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="pf-card p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-slate-900">Overview</h2>
              <p className="mt-4 leading-relaxed text-slate-700">{project.description}</p>
            </div>

            <div className="pf-card mt-6 p-6 sm:p-8">
              <h2 className="flex items-center gap-2 font-display text-xl font-bold text-slate-900">
                <ListChecks className="h-5 w-5 text-primary-600" />
                Key Features
              </h2>
              <ul className="mt-4 space-y-3">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-700">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resume-ready description */}
            <div className="pf-card mt-6 overflow-hidden">
              <button
                onClick={() => setShowResume((v) => !v)}
                className="flex w-full items-center justify-between p-6 text-left sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold text-slate-900">Resume-ready description</h2>
                    <p className="text-sm text-slate-500">A polished summary you can use on your resume or portfolio.</p>
                  </div>
                </div>
                <span className={`text-sm font-medium text-primary-600 transition-transform ${showResume ? 'rotate-180' : ''}`}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {showResume && (
                <div className="border-t border-slate-100 p-6 sm:p-8 animate-fade-in">
                  <div className="rounded-xl bg-slate-50 p-5">
                    <p className="text-sm leading-relaxed text-slate-700">{resumeText}</p>
                  </div>
                  <button
                    onClick={handleCopyResume}
                    className="pf-btn-secondary mt-4 px-4 py-2 text-sm"
                  >
                    {resumeCopied ? <Check className="h-4 w-4 text-accent-600" /> : <Copy className="h-4 w-4" />}
                    {resumeCopied ? 'Copied to clipboard!' : 'Copy to clipboard'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-24 space-y-6">
              <div className="pf-card p-6">
                <h3 className="flex items-center gap-2 font-display text-base font-bold text-slate-900">
                  <Code2 className="h-4 w-4 text-primary-600" />
                  Tech Stack
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Link
                      key={tech}
                      to={`/explore?tech=${encodeURIComponent(tech)}`}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
                    >
                      {tech}
                    </Link>
                  ))}
                </div>

                <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Category</span>
                    <span className="font-medium text-slate-800">{project.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Difficulty</span>
                    <span className="font-medium text-slate-800">{project.difficulty}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Dev Time</span>
                    <span className="font-medium text-slate-800">{project.development_time}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Rating</span>
                    <span className="flex items-center gap-1 font-medium text-slate-800">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {project.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => toggleSave(project.id)}
                  className={`pf-btn w-full px-5 py-3 text-base ${
                    saved
                      ? 'bg-primary-600 text-white hover:bg-primary-700 active:scale-[0.97] shadow-sm shadow-primary-600/20'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 active:scale-[0.97]'
                  }`}
                >
                  <Bookmark className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
                  {saved ? 'Saved to Collection' : 'Save Project'}
                </button>
                <button
                  onClick={handleShare}
                  className="pf-btn-secondary w-full px-5 py-3 text-base"
                >
                  {copied ? <Check className="h-5 w-5 text-accent-600" /> : <Share2 className="h-5 w-5" />}
                  {copied ? 'Link Copied!' : 'Share Project'}
                </button>
                <Link to="/generate" className="pf-btn-ghost w-full px-5 py-3 text-base">
                  <Sparkles className="h-5 w-5" />
                  Try the Generator
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-slate-400" />
              <h2 className="pf-section-title text-2xl">Related projects</h2>
            </div>
            <p className="mt-2 text-slate-600">More ideas in the {project.category} category.</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
