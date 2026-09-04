import type { Project } from '@/types';

export type MatchReason = {
  label: string;
  matched: boolean;
};

export type MatchResult = {
  score: number;
  reasons: MatchReason[];
};

export type GeneratorAnswers = {
  categories: string[];
  difficulty: string;
  developmentTime: string;
  interest: string;
};

const INTEREST_MAP: Record<string, (p: Project) => boolean> = {
  'build-realworld': (p) => p.category === 'Web' || p.category === 'Mobile',
  'explore-ai': (p) => p.category === 'AI/ML' || p.technologies.some((t) => /TensorFlow|PyTorch|Keras|OpenAI|LangChain|scikit-learn/i.test(t)),
  'systems-level': (p) => p.category === 'Systems' || p.technologies.some((t) => /Rust|C\+\+|C |Linux|CMake|ncurses/i.test(t)),
  'creative-visual': (p) => p.category === 'Game Dev' || p.technologies.some((t) => /SDL2|Pygame|Lua|D3\.js|Chart\.js/i.test(t)),
  'security-focused': (p) => p.category === 'Security' || p.technologies.some((t) => /Web Crypto|Solidity|Ethereum/i.test(t)),
  'data-driven': (p) => p.category === 'Data' || p.technologies.some((t) => /PostgreSQL|SQLite|MongoDB|Redis|D3\.js|Chart\.js/i.test(t)),
};

export function scoreProject(project: Project, answers: GeneratorAnswers): MatchResult {
  const reasons: MatchReason[] = [];
  let points = 0;
  let total = 0;

  // Category match
  total++;
  if (answers.categories.length > 0) {
    const matched = answers.categories.includes(project.category);
    reasons.push({ label: `Domain: ${project.category}`, matched });
    if (matched) points++;
  } else {
    reasons.push({ label: `Domain: ${project.category}`, matched: false });
  }

  // Difficulty match
  total++;
  if (answers.difficulty) {
    const matched = project.difficulty === answers.difficulty;
    reasons.push({ label: `Difficulty: ${project.difficulty}`, matched });
    if (matched) points++;
  } else {
    reasons.push({ label: `Difficulty: ${project.difficulty}`, matched: false });
  }

  // Development time match
  total++;
  if (answers.developmentTime) {
    const matched = project.development_time === answers.developmentTime;
    reasons.push({ label: `Timeline: ${project.development_time}`, matched });
    if (matched) points++;
  } else {
    reasons.push({ label: `Timeline: ${project.development_time}`, matched: false });
  }

  // Interest match (optional, weighted less)
  if (answers.interest && INTEREST_MAP[answers.interest]) {
    total += 0.5;
    const matched = INTEREST_MAP[answers.interest](project);
    reasons.push({ label: 'Aligns with your interest', matched });
    if (matched) points += 0.5;
  }

  const score = total > 0 ? Math.round((points / total) * 100) : 0;
  return { score, reasons };
}

export function bestMatches(projects: Project[], answers: GeneratorAnswers): { project: Project; match: MatchResult }[] {
  return projects
    .map((p) => ({ project: p, match: scoreProject(p, answers) }))
    .sort((a, b) => b.match.score - a.match.score);
}

export function generateResumeDescription(project: Project): string {
  const techList = project.technologies.slice(0, 5).join(', ');
  const featureHighlights = project.features.slice(0, 3).join('; ');

  return `Built a ${project.difficulty.toLowerCase()}-level ${project.category} application — ${project.title} — using ${techList}. ${project.description.trim()} Key implementation highlights include: ${featureHighlights}. The project was scoped for a ${project.development_time.toLowerCase()} development cycle, demonstrating proficiency in ${project.technologies.slice(0, 3).join(', ')} and software engineering practices including architecture design, iterative development, and feature prioritization.`;
}
