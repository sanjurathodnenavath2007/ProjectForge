import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, Compass, ChevronDown } from 'lucide-react';
import { fetchProjects } from '@/lib/supabase';
import type { Project } from '@/types';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectGridSkeleton, ErrorState, EmptyState } from '@/components/States';
import { FilterPanel, EMPTY_FILTERS, countActiveFilters, type Filters } from '@/components/FilterPanel';
import { getCategoryMeta, getDifficultyMeta } from '@/lib/meta';

type SortKey = 'rating' | 'title' | 'difficulty';

const DIFFICULTY_ORDER: Record<string, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

export function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [sort, setSort] = useState<SortKey>('rating');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const load = () => {
    setLoading(true);
    setError(null);
    fetchProjects()
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : 'Failed to load projects');
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, []);

  // Sync category/tech from URL on mount
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setFilters((prev) => ({ ...prev, categories: [cat] }));
    }
    const tech = searchParams.get('tech');
    if (tech) {
      setFilters((prev) => ({ ...prev, technologies: [tech] }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    let result = projects;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.difficulties.length > 0) {
      result = result.filter((p) => filters.difficulties.includes(p.difficulty));
    }
    if (filters.developmentTimes.length > 0) {
      result = result.filter((p) => filters.developmentTimes.includes(p.development_time));
    }
    if (filters.technologies.length > 0) {
      result = result.filter((p) =>
        filters.technologies.some((t) => p.technologies.includes(t)),
      );
    }

    const sorted = [...result];
    if (sort === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'title') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'difficulty') {
      sorted.sort(
        (a, b) => (DIFFICULTY_ORDER[a.difficulty] ?? 0) - (DIFFICULTY_ORDER[b.difficulty] ?? 0),
      );
    }
    return sorted;
  }, [projects, search, filters, sort]);

  const handleClear = () => {
    setFilters(EMPTY_FILTERS);
    setSearch('');
    setSearchParams({});
  };

  const removeFilter = (type: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: (prev[type] as string[]).filter((v) => v !== value),
    }));
  };

  const hasActiveFilters =
    search.trim() !== '' ||
    countActiveFilters(filters) > 0;

  const allActiveChips: { type: keyof Filters; value: string; label: string }[] = [
    ...filters.categories.map((v) => ({ type: 'categories' as const, value: v, label: v })),
    ...filters.difficulties.map((v) => ({ type: 'difficulties' as const, value: v, label: v })),
    ...filters.developmentTimes.map((v) => ({ type: 'developmentTimes' as const, value: v, label: v })),
    ...filters.technologies.map((v) => ({ type: 'technologies' as const, value: v, label: v })),
  ];

  return (
    <div className="pf-container py-8 lg:py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Compass className="h-4 w-4" />
          <span>Explore</span>
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Explore Projects
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Browse {projects.length} curated project ideas. Use filters to narrow down by technology,
          category, difficulty, or development time.
        </p>
      </div>

      {/* Search + sort bar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, tagline, or technology..."
            className="pf-input pl-11"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="pf-input w-auto cursor-pointer appearance-none pr-9 py-2.5"
            >
              <option value="rating">Top Rated</option>
              <option value="title">A-Z</option>
              <option value="difficulty">Difficulty</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
          <button
            onClick={() => setShowMobileFilters(true)}
            className="pf-btn-secondary relative px-4 py-2.5 lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {countActiveFilters(filters) > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary-600 px-1 text-xs font-bold text-white">
                {countActiveFilters(filters)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Active filter chips */}
      {allActiveChips.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {allActiveChips.map((chip) => {
            const catMeta = chip.type === 'categories' ? getCategoryMeta(chip.value) : null;
            const diffMeta = chip.type === 'difficulties' ? getDifficultyMeta(chip.value) : null;
            return (
              <span
                key={`${chip.type}-${chip.value}`}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                  catMeta ? `${catMeta.bg} ${catMeta.color}` : diffMeta ? `${diffMeta.bg} ${diffMeta.color}` : 'bg-primary-50 text-primary-700'
                }`}
              >
                {catMeta && <catMeta.icon className="h-3 w-3" />}
                {chip.label}
                <button
                  onClick={() => removeFilter(chip.type, chip.value)}
                  className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-black/10"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            );
          })}
          <button
            onClick={handleClear}
            className="text-xs font-medium text-slate-500 underline-offset-2 hover:text-error-600 hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <FilterPanel filters={filters} onChange={setFilters} onClear={handleClear} />
          </div>
        </aside>

        {/* Mobile filter drawer */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setShowMobileFilters(false)}
            />
            <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-white p-5 shadow-2xl animate-slide-in">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display font-bold text-slate-900">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="pf-btn-ghost p-1.5"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <FilterPanel
                filters={filters}
                onChange={setFilters}
                onClear={handleClear}
                compact
              />
              <button
                onClick={() => setShowMobileFilters(false)}
                className="pf-btn-primary mt-4 w-full py-2.5"
              >
                Show {filtered.length} results
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {loading ? 'Loading...' : `${filtered.length} project${filtered.length !== 1 ? 's' : ''} found`}
            </p>
          </div>

          {error ? (
            <ErrorState message={error} onRetry={load} />
          ) : loading ? (
            <ProjectGridSkeleton count={6} />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={Compass}
              title="No projects found"
              description="Try adjusting your filters or search query to find more projects."
              action={
                <button onClick={handleClear} className="pf-btn-primary px-4 py-2 text-sm">
                  Clear all filters
                </button>
              }
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
