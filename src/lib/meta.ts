import type { LucideIcon } from 'lucide-react';
import {
  Globe,
  Smartphone,
  Brain,
  ShieldCheck,
  Cpu,
  Gamepad2,
  BarChart3,
  Server,
} from 'lucide-react';

export const CATEGORY_META: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  Web: { icon: Globe, color: 'text-primary-600', bg: 'bg-primary-50' },
  Mobile: { icon: Smartphone, color: 'text-accent-600', bg: 'bg-accent-50' },
  'AI/ML': { icon: Brain, color: 'text-violet-600', bg: 'bg-violet-50' },
  Security: { icon: ShieldCheck, color: 'text-rose-600', bg: 'bg-rose-50' },
  IoT: { icon: Cpu, color: 'text-amber-600', bg: 'bg-amber-50' },
  'Game Dev': { icon: Gamepad2, color: 'text-fuchsia-600', bg: 'bg-fuchsia-50' },
  Data: { icon: BarChart3, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  Systems: { icon: Server, color: 'text-slate-600', bg: 'bg-slate-100' },
};

export const DIFFICULTY_META: Record<string, { color: string; bg: string; ring: string }> = {
  Beginner: { color: 'text-success-700', bg: 'bg-success-50', ring: 'ring-success-200' },
  Intermediate: { color: 'text-warning-700', bg: 'bg-warning-50', ring: 'ring-warning-200' },
  Advanced: { color: 'text-error-700', bg: 'bg-error-50', ring: 'ring-error-200' },
};

export function getCategoryMeta(category: string) {
  return (
    CATEGORY_META[category] ?? {
      icon: Globe,
      color: 'text-slate-600',
      bg: 'bg-slate-100',
    }
  );
}

export function getDifficultyMeta(difficulty: string) {
  return (
    DIFFICULTY_META[difficulty] ?? {
      color: 'text-slate-700',
      bg: 'bg-slate-100',
      ring: 'ring-slate-200',
    }
  );
}
