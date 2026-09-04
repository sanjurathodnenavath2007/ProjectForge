import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, Save, X, Compass, FileText, Search } from 'lucide-react';
import { useSaved } from '@/context/SavedContext';
import { getCategoryMeta, getDifficultyMeta } from '@/lib/meta';
import { ErrorState, EmptyState } from '@/components/States';

export function SavedPage() {
  const { saved, loading, error, toggleSave, updateNotes, refresh } = useSaved();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftNotes, setDraftNotes] = useState('');
  const [search, setSearch] = useState('');

  const filtered = saved.filter((s) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      s.project?.title.toLowerCase().includes(q) ||
      s.project?.category.toLowerCase().includes(q) ||
      s.project?.technologies.some((t) => t.toLowerCase().includes(q))
    );
  });

  const startEdit = (projectId: string, currentNotes: string) => {
    setEditingId(projectId);
    setDraftNotes(currentNotes);
  };

  const saveNotes = async (projectId: string) => {
    await updateNotes(projectId, draftNotes);
    setEditingId(null);
    setDraftNotes('');
  };

  return (
    <div className="pf-container py-8 lg:py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Bookmark className="h-4 w-4" />
          <span>Saved</span>
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Saved Projects
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Your personal collection of bookmarked project ideas. Add notes to each project to track
          your thoughts and plans.
        </p>
      </div>

      {error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : loading ? (
        <div className="pf-card p-8 text-center text-slate-500">Loading your saved projects...</div>
      ) : saved.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No saved projects yet"
          description="Browse the catalog and bookmark projects that interest you. They will appear here for easy access."
          action={
            <Link to="/explore" className="pf-btn-primary px-5 py-2.5">
              <Compass className="h-5 w-5" />
              Explore Projects
            </Link>
          }
        />
      ) : (
        <>
          {/* Search */}
          <div className="relative mb-6 max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search saved projects..."
              className="pf-input pl-11"
            />
          </div>

          <div className="mb-4 text-sm text-slate-500">
            {filtered.length} saved project{filtered.length !== 1 ? 's' : ''}
          </div>

          <div className="space-y-4">
            {filtered.map((item) => {
              const project = item.project;
              if (!project) return null;
              const catMeta = getCategoryMeta(project.category);
              const diffMeta = getDifficultyMeta(project.difficulty);
              const isEditing = editingId === item.project_id;

              return (
                <div
                  key={item.id}
                  className="pf-card overflow-hidden animate-fade-in-up"
                >
                  <div className="flex flex-col sm:flex-row">
                    <Link
                      to={`/project/${project.slug}`}
                      className="relative aspect-video w-full shrink-0 overflow-hidden sm:h-auto sm:w-56"
                    >
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-100 to-accent-100">
                          <catMeta.icon className="h-10 w-10 text-primary-400" />
                        </div>
                      )}
                    </Link>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className={`pf-badge ${catMeta.bg} ${catMeta.color}`}>
                          <catMeta.icon className="h-3.5 w-3.5" />
                          {project.category}
                        </span>
                        <span className={`pf-badge ${diffMeta.bg} ${diffMeta.color} ring-1 ${diffMeta.ring}`}>
                          {project.difficulty}
                        </span>
                        <span className="text-xs text-slate-500">{project.development_time}</span>
                      </div>

                      <Link to={`/project/${project.slug}`}>
                        <h3 className="font-display text-lg font-bold text-slate-900 transition-colors hover:text-primary-700">
                          {project.title}
                        </h3>
                      </Link>
                      <p className="mt-1 line-clamp-2 text-sm text-slate-500">{project.tagline}</p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((t) => (
                          <span key={t} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Notes */}
                      <div className="mt-4 border-t border-slate-100 pt-4">
                        {isEditing ? (
                          <div>
                            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                              <FileText className="h-3.5 w-3.5" />
                              Your notes
                            </label>
                            <textarea
                              value={draftNotes}
                              onChange={(e) => setDraftNotes(e.target.value)}
                              rows={3}
                              placeholder="Add your thoughts, plans, or reminders about this project..."
                              className="pf-input resize-none"
                              autoFocus
                            />
                            <div className="mt-2 flex gap-2">
                              <button
                                onClick={() => saveNotes(item.project_id)}
                                className="pf-btn-primary px-3 py-1.5 text-xs"
                              >
                                <Save className="h-3.5 w-3.5" />
                                Save notes
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="pf-btn-ghost px-3 py-1.5 text-xs"
                              >
                                <X className="h-3.5 w-3.5" />
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              {item.notes ? (
                                <p className="text-sm italic text-slate-600">&ldquo;{item.notes}&rdquo;</p>
                              ) : (
                                <button
                                  onClick={() => startEdit(item.project_id, item.notes)}
                                  className="text-xs font-medium text-slate-400 hover:text-primary-600"
                                >
                                  + Add a note
                                </button>
                              )}
                            </div>
                            {item.notes && !isEditing && (
                              <button
                                onClick={() => startEdit(item.project_id, item.notes)}
                                className="text-xs font-medium text-slate-400 hover:text-primary-600"
                              >
                                Edit
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex items-center gap-2">
                        <Link
                          to={`/project/${project.slug}`}
                          className="pf-btn-secondary px-3 py-1.5 text-xs"
                        >
                          View details
                        </Link>
                        <button
                          onClick={() => toggleSave(item.project_id)}
                          className="pf-btn-ghost px-3 py-1.5 text-xs text-error-600 hover:bg-error-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && search && (
            <p className="mt-4 text-center text-sm text-slate-500">
              No saved projects match &ldquo;{search}&rdquo;.
            </p>
          )}
        </>
      )}
    </div>
  );
}
