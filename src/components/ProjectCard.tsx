import { Link } from 'react-router-dom';
import { Clock, Star, Bookmark, ArrowRight, Layers } from 'lucide-react';
import type { Project } from '@/types';
import { useSaved } from '@/context/SavedContext';
import { getCategoryMeta, getDifficultyMeta } from '@/lib/meta';

export function ProjectCard({
  project,
  index = 0,
  matchScore,
}: {
  project: Project;
  index?: number;
  matchScore?: number;
}) {
  const { isSaved, toggleSave } = useSaved();
  const saved = isSaved(project.id);
  const catMeta = getCategoryMeta(project.category);
  const diffMeta = getDifficultyMeta(project.difficulty);
  const showMatch = matchScore !== undefined && matchScore > 0;

  return (
    <div
      className="pf-card pf-card-hover group flex flex-col overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${Math.min(index * 60, 400)}ms` }}
    >
      <Link to={`/project/${project.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-100 to-accent-100">
            <catMeta.icon className="h-12 w-12 text-primary-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className={`pf-badge ${catMeta.bg} ${catMeta.color} backdrop-blur-sm`}>
            <catMeta.icon className="h-3.5 w-3.5" />
            {project.category}
          </span>
        </div>
        {showMatch && (
          <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-lg bg-slate-900/80 px-2.5 py-1.5 backdrop-blur-sm">
            <span className={`h-2 w-2 rounded-full ${matchScore >= 75 ? 'bg-accent-400' : matchScore >= 50 ? 'bg-amber-400' : 'bg-slate-400'}`} />
            <span className="text-xs font-bold text-white">{matchScore}% match</span>
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleSave(project.id);
          }}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg backdrop-blur-sm transition-all duration-200 ${
            saved
              ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
              : 'bg-white/90 text-slate-600 hover:bg-white hover:text-primary-600'
          }`}
          aria-label={saved ? 'Unsave project' : 'Save project'}
        >
          <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
        </button>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2.5 flex flex-wrap items-center gap-2 text-xs">
          <span className={`pf-badge ${diffMeta.bg} ${diffMeta.color} ring-1 ${diffMeta.ring}`}>
            {project.difficulty}
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            <Clock className="h-3.5 w-3.5" />
            {project.development_time}
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            <Layers className="h-3.5 w-3.5" />
            {project.technologies.length} tech
          </span>
        </div>

        <Link to={`/project/${project.slug}`}>
          <h3 className="font-display text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-primary-700">
            {project.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
          {project.tagline}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-400">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="flex items-center gap-1 text-sm text-slate-500">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-700">{project.rating.toFixed(1)}</span>
          </span>
          <Link
            to={`/project/${project.slug}`}
            className="flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
          >
            View
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
