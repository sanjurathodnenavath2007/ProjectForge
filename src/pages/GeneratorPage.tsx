import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, RefreshCw, ArrowRight, Bookmark, Check, Lightbulb,
  Wand2, Compass, Target, Clock, Code2, TrendingUp,
} from 'lucide-react';
import { fetchProjects } from '@/lib/supabase';
import type { Project } from '@/types';
import { CATEGORIES, DIFFICULTIES, DEVELOPMENT_TIMES } from '@/types';
import { getCategoryMeta, getDifficultyMeta } from '@/lib/meta';
import { useSaved } from '@/context/SavedContext';
import { ProjectGridSkeleton, ErrorState } from '@/components/States';
import { bestMatches, scoreProject, type GeneratorAnswers } from '@/lib/matching';

type Step = 'form' | 'result';

type Answers = {
  categories: string[];
  difficulty: string;
  developmentTime: string;
  interest: string;
};

const INTERESTS = [
  { id: 'build-realworld', label: 'Real-world utility apps', desc: 'Solve everyday problems' },
  { id: 'explore-ai', label: 'AI and machine learning', desc: 'Work with models and data' },
  { id: 'systems-level', label: 'Systems & performance', desc: 'Low-level, high-performance' },
  { id: 'creative-visual', label: 'Creative & visual', desc: 'Games, graphics, design' },
  { id: 'security-focused', label: 'Security & cryptography', desc: 'Protect and analyze' },
  { id: 'data-driven', label: 'Data & analytics', desc: 'Process and visualize data' },
];

const DIFFICULTY_PREFERENCE = [
  { id: 'Beginner', label: 'Just starting out', desc: 'Beginner-friendly projects' },
  { id: 'Intermediate', label: 'Comfortable building', desc: 'Solid intermediate challenge' },
  { id: 'Advanced', label: 'Ready for a challenge', desc: 'Advanced, complex projects' },
];

export function GeneratorPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<Step>('form');
  const [answers, setAnswers] = useState<Answers>({
    categories: [],
    difficulty: '',
    developmentTime: '',
    interest: '',
  });
  const [results, setResults] = useState<{ project: Project; score: number }[]>([]);
  const [topResult, setTopResult] = useState<Project | null>(null);
  const { isSaved, toggleSave } = useSaved();

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

  const canSubmit = answers.categories.length > 0 && answers.difficulty && answers.developmentTime;

  const generate = () => {
    const generatorAnswers: GeneratorAnswers = {
      categories: answers.categories,
      difficulty: answers.difficulty,
      developmentTime: answers.developmentTime,
      interest: answers.interest,
    };
    const ranked = bestMatches(projects, generatorAnswers);
    const top = ranked[0]?.project ?? projects[Math.floor(Math.random() * projects.length)] ?? null;
    setTopResult(top);
    setResults(ranked.slice(0, 3).map((r) => ({ project: r.project, score: r.match.score })));
    setStep('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reset = () => {
    setStep('form');
    setTopResult(null);
    setResults([]);
    setAnswers({ categories: [], difficulty: '', developmentTime: '', interest: '' });
  };

  const toggleCategory = (cat: string) => {
    setAnswers((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  if (loading) {
    return (
      <div className="pf-container py-12">
        <div className="mb-8"><GeneratorHeader /></div>
        <ProjectGridSkeleton count={1} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pf-container py-12">
        <GeneratorHeader />
        <div className="mt-8"><ErrorState message={error} /></div>
      </div>
    );
  }

  return (
    <div className="pf-container py-8 lg:py-12">
      <GeneratorHeader />

      {step === 'form' && (
        <div className="mx-auto mt-8 max-w-3xl animate-fade-in-up">
          <div className="pf-card p-6 sm:p-8">
            <FormSection number={1} title="What domains interest you?" subtitle="Pick one or more categories.">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {CATEGORIES.map((cat) => {
                  const meta = getCategoryMeta(cat);
                  const active = answers.categories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all duration-200 ${
                        active
                          ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500/20'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <meta.icon className={`h-7 w-7 ${active ? meta.color : 'text-slate-400'}`} />
                      <span className={`text-sm font-medium ${active ? 'text-slate-900' : 'text-slate-600'}`}>
                        {cat}
                      </span>
                    </button>
                  );
                })}
              </div>
            </FormSection>

            <FormSection number={2} title="How experienced are you?" subtitle="Choose your comfort level.">
              <div className="grid gap-3 sm:grid-cols-3">
                {DIFFICULTY_PREFERENCE.map((opt) => {
                  const active = answers.difficulty === opt.id;
                  const meta = getDifficultyMeta(opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setAnswers((prev) => ({ ...prev, difficulty: opt.id }))}
                      className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                        active
                          ? `border-current ${meta.bg} ${meta.color} ring-2 ring-current/20`
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <p className={`text-sm font-semibold ${active ? '' : 'text-slate-800'}`}>{opt.label}</p>
                      <p className={`mt-0.5 text-xs ${active ? 'opacity-80' : 'text-slate-500'}`}>{opt.desc}</p>
                    </button>
                  );
                })}
              </div>
            </FormSection>

            <FormSection number={3} title="How much time do you have?" subtitle="Pick a development timeframe.">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {DEVELOPMENT_TIMES.map((time) => {
                  const active = answers.developmentTime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => setAnswers((prev) => ({ ...prev, developmentTime: time }))}
                      className={`rounded-xl border p-3 text-center text-sm font-medium transition-all duration-200 ${
                        active
                          ? 'border-primary-500 bg-primary-50 text-primary-700 ring-2 ring-primary-500/20'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </FormSection>

            <FormSection number={4} title="What draws you in? (optional)" subtitle="Helps fine-tune the recommendation.">
              <div className="grid gap-2 sm:grid-cols-2">
                {INTERESTS.map((opt) => {
                  const active = answers.interest === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          interest: prev.interest === opt.id ? '' : opt.id,
                        }))
                      }
                      className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200 ${
                        active
                          ? 'border-accent-500 bg-accent-50 ring-2 ring-accent-500/20'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        active ? 'border-accent-600 bg-accent-600' : 'border-slate-300'
                      }`}>
                        {active && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${active ? 'text-accent-800' : 'text-slate-700'}`}>{opt.label}</p>
                        <p className="text-xs text-slate-500">{opt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </FormSection>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <button
                onClick={generate}
                disabled={!canSubmit}
                className="pf-btn-primary w-full px-6 py-3.5 text-base"
              >
                <Wand2 className="h-5 w-5" />
                Generate My Project Idea
              </button>
              {!canSubmit && (
                <p className="mt-3 text-center text-xs text-slate-400">
                  Select at least one category, difficulty, and timeframe to continue.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {step === 'result' && topResult && (
        <ResultView
          project={topResult}
          answers={answers}
          saved={isSaved(topResult.id)}
          onToggleSave={() => toggleSave(topResult.id)}
          onReset={reset}
          onRegenerate={generate}
          alternatives={results.filter((r) => r.project.id !== topResult.id).slice(0, 2)}
        />
      )}

      {step === 'result' && !topResult && (
        <div className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-slate-600">No matching project found. Try different answers.</p>
          <button onClick={reset} className="pf-btn-primary mt-4 px-5 py-2.5">
            <RefreshCw className="h-4 w-4" />
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}

function GeneratorHeader() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Sparkles className="h-4 w-4" />
        <span>Generator</span>
      </div>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Project Idea Generator
      </h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Answer a few quick questions and we will match you with a personalized project idea from our
        catalog of realistic, build-worthy software projects.
      </p>
    </div>
  );
}

function FormSection({
  number,
  title,
  subtitle,
  children,
}: {
  number: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-sm font-bold text-primary-700">
          {number}
        </span>
        <div>
          <h3 className="font-display text-base font-bold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function MatchReasonRow({ icon: Icon, label, matched }: { icon: typeof Target; label: string; matched: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm ${matched ? 'bg-accent-50 text-accent-800' : 'bg-slate-50 text-slate-500'}`}>
      <Icon className={`h-4 w-4 ${matched ? 'text-accent-600' : 'text-slate-400'}`} />
      <span className="font-medium">{label}</span>
      {matched && <Check className="ml-auto h-4 w-4 text-accent-600" strokeWidth={3} />}
    </div>
  );
}

function ResultView({
  project,
  answers,
  saved,
  onToggleSave,
  onReset,
  onRegenerate,
  alternatives,
}: {
  project: Project;
  answers: Answers;
  saved: boolean;
  onToggleSave: () => void;
  onReset: () => void;
  onRegenerate: () => void;
  alternatives: { project: Project; score: number }[];
}) {
  const catMeta = getCategoryMeta(project.category);
  const diffMeta = getDifficultyMeta(project.difficulty);
  const match = scoreProject(project, {
    categories: answers.categories,
    difficulty: answers.difficulty,
    developmentTime: answers.developmentTime,
    interest: answers.interest,
  });

  return (
    <div className="mx-auto mt-8 max-w-4xl animate-scale-in">
      <div className="mb-6 flex items-center gap-3 rounded-xl bg-accent-50 px-4 py-3.5 text-sm font-medium text-accent-800">
        <Lightbulb className="h-5 w-5 shrink-0" />
        Here is a project idea tailored to your answers.
      </div>

      <div className="pf-card overflow-hidden">
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          {project.image_url ? (
            <img src={project.image_url} alt={project.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-600 to-accent-600">
              <catMeta.icon className="h-16 w-16 text-white/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className={`pf-badge ${catMeta.bg} ${catMeta.color} backdrop-blur-sm`}>
              <catMeta.icon className="h-3.5 w-3.5" />
              {project.category}
            </span>
            <span className={`pf-badge ${diffMeta.bg} ${diffMeta.color} ring-1 ${diffMeta.ring} backdrop-blur-sm`}>
              {project.difficulty}
            </span>
            <span className="pf-badge bg-white/20 text-white backdrop-blur-sm">
              <Clock className="h-3.5 w-3.5" />
              {project.development_time}
            </span>
          </div>
          {/* Match score badge */}
          <div className="absolute right-4 top-4 flex items-center gap-2 rounded-xl bg-slate-900/80 px-3.5 py-2 backdrop-blur-md">
            <div className="relative h-9 w-9">
              <svg className="h-9 w-9 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15" fill="none" stroke={match.score >= 75 ? '#34d3a5' : match.score >= 50 ? '#fbbf24' : '#94a3b8'} strokeWidth="3"
                  strokeDasharray={`${(match.score / 100) * 94.2} 94.2`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">{match.score}%</span>
            </div>
            <span className="text-xs font-semibold text-white">Match</span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900">{project.title}</h2>
          <p className="mt-2 text-slate-600">{project.tagline}</p>

          {/* Why this matches */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Target className="h-4 w-4 text-primary-600" />
              Why this matches your preferences
            </h4>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {match.reasons.map((reason, i) => {
                const icon = [Target, TrendingUp, Clock, Code2][i] ?? Target;
                return (
                  <MatchReasonRow key={i} icon={icon} label={reason.label} matched={reason.matched} />
                );
              })}
            </div>
          </div>

          <p className="mt-6 leading-relaxed text-slate-700">{project.description}</p>

          <div className="mt-6">
            <h4 className="text-sm font-semibold text-slate-900">Key features</h4>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" strokeWidth={3} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-semibold text-slate-900">Tech stack</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span key={t} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
            <button onClick={onToggleSave} className={`pf-btn flex-1 px-5 py-3 ${
              saved ? 'bg-primary-600 text-white hover:bg-primary-700' : 'pf-btn-secondary'
            }`}>
              <Bookmark className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
              {saved ? 'Saved' : 'Save This Project'}
            </button>
            <button onClick={onRegenerate} className="pf-btn-secondary flex-1 px-5 py-3">
              <RefreshCw className="h-5 w-5" />
              Regenerate
            </button>
            <Link to={`/project/${project.slug}`} className="pf-btn-primary flex-1 px-5 py-3">
              View Details
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Alternative matches */}
      {alternatives.length > 0 && (
        <div className="mt-10">
          <h3 className="font-display text-lg font-bold text-slate-900">Other strong matches</h3>
          <p className="mt-1 text-sm text-slate-500">These also fit your answers well.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {alternatives.map(({ project: alt, score }) => {
              const altCat = getCategoryMeta(alt.category);
              return (
                <Link
                  key={alt.id}
                  to={`/project/${alt.slug}`}
                  className="pf-card pf-card-hover flex items-center gap-4 p-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-accent-100">
                    <altCat.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-bold text-slate-900">{alt.title}</p>
                    <p className="truncate text-xs text-slate-500">{alt.category} · {alt.difficulty} · {alt.development_time}</p>
                  </div>
                  <span className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold ${
                    score >= 75 ? 'bg-accent-100 text-accent-700' : score >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {score}%
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-center gap-3">
        <button onClick={onReset} className="text-sm font-medium text-slate-500 hover:text-slate-700">
          Start over
        </button>
        <span className="text-slate-300">|</span>
        <Link to="/explore" className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700">
          <Compass className="h-4 w-4" />
          Browse all projects
        </Link>
      </div>
    </div>
  );
}
