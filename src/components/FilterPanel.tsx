import { Check, X, Filter } from 'lucide-react';
import { CATEGORIES, DIFFICULTIES, DEVELOPMENT_TIMES, ALL_TECHNOLOGIES } from '@/types';
import { getCategoryMeta, getDifficultyMeta } from '@/lib/meta';

export type Filters = {
  technologies: string[];
  categories: string[];
  difficulties: string[];
  developmentTimes: string[];
};

export const EMPTY_FILTERS: Filters = {
  technologies: [],
  categories: [],
  difficulties: [],
  developmentTimes: [],
};

export function toggleInArray(arr: string[], value: string): string[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

export function countActiveFilters(f: Filters): number {
  return (
    f.technologies.length +
    f.categories.length +
    f.difficulties.length +
    f.developmentTimes.length
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </h4>
      {children}
    </div>
  );
}

function CheckChip({
  label,
  active,
  onClick,
  icon,
  colorClass,
  bgClass,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  colorClass?: string;
  bgClass?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 ${
        active
          ? `${bgClass ?? 'bg-primary-50'} ${colorClass ?? 'text-primary-700'}`
          : 'text-slate-600 hover:bg-slate-50'
      }`}
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
          active
            ? `${colorClass?.includes('text-') ? 'border-current' : 'border-primary-600'}`
            : 'border-slate-300'
        }`}
      >
        {active && <Check className="h-3 w-3" />}
      </span>
      {icon}
      <span className="truncate">{label}</span>
    </button>
  );
}

export function FilterPanel({
  filters,
  onChange,
  onClear,
  compact = false,
}: {
  filters: Filters;
  onChange: (next: Filters) => void;
  onClear: () => void;
  compact?: boolean;
}) {
  const activeCount = countActiveFilters(filters);

  return (
    <div className={compact ? '' : 'pf-card p-5'}>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-500" />
          <h3 className="font-display text-sm font-bold text-slate-900">Filters</h3>
          {activeCount > 0 && (
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary-100 px-1.5 text-xs font-semibold text-primary-700">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs font-medium text-slate-500 transition-colors hover:text-error-600"
          >
            <X className="h-3.5 w-3.5" />
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-5">
        <FilterSection title="Category">
          <div className="space-y-0.5">
            {CATEGORIES.map((cat) => {
              const meta = getCategoryMeta(cat);
              return (
                <CheckChip
                  key={cat}
                  label={cat}
                  active={filters.categories.includes(cat)}
                  onClick={() =>
                    onChange({ ...filters, categories: toggleInArray(filters.categories, cat) })
                  }
                  icon={<meta.icon className={`h-4 w-4 ${meta.color}`} />}
                  colorClass={meta.color}
                  bgClass={meta.bg}
                />
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="Difficulty">
          <div className="space-y-0.5">
            {DIFFICULTIES.map((diff) => {
              const meta = getDifficultyMeta(diff);
              return (
                <CheckChip
                  key={diff}
                  label={diff}
                  active={filters.difficulties.includes(diff)}
                  onClick={() =>
                    onChange({ ...filters, difficulties: toggleInArray(filters.difficulties, diff) })
                  }
                  colorClass={meta.color}
                  bgClass={meta.bg}
                />
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="Development Time">
          <div className="space-y-0.5">
            {DEVELOPMENT_TIMES.map((time) => (
              <CheckChip
                key={time}
                label={time}
                active={filters.developmentTimes.includes(time)}
                onClick={() =>
                  onChange({
                    ...filters,
                    developmentTimes: toggleInArray(filters.developmentTimes, time),
                  })
                }
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Technology">
          <div className="flex max-h-56 flex-wrap gap-1.5 overflow-y-auto pr-1">
            {ALL_TECHNOLOGIES.map((tech) => {
              const active = filters.technologies.includes(tech);
              return (
                <button
                  key={tech}
                  onClick={() =>
                    onChange({ ...filters, technologies: toggleInArray(filters.technologies, tech) })
                  }
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-150 ${
                    active
                      ? 'bg-primary-600 text-white shadow-sm shadow-primary-600/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>
        </FilterSection>
      </div>
    </div>
  );
}
