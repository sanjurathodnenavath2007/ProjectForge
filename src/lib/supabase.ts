import { createClient } from '@supabase/supabase-js';
import type { Project, SavedProject } from '@/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

const SESSION_KEY_STORAGE = 'pf_session_key';

export function getSessionKey(): string {
  let key = localStorage.getItem(SESSION_KEY_STORAGE);
  if (!key) {
    key = `pf_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    localStorage.setItem(SESSION_KEY_STORAGE, key);
  }
  return key;
}

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('rating', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Project[];
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return (data as Project) ?? null;
}

export async function fetchSavedProjects(): Promise<SavedProject[]> {
  const sessionKey = getSessionKey();
  const { data, error } = await supabase
    .from('saved_projects')
    .select('*, project:projects(*)')
    .eq('session_key', sessionKey)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as SavedProject[];
}

export async function saveProject(projectId: string, notes = ''): Promise<void> {
  const sessionKey = getSessionKey();
  const { error } = await supabase
    .from('saved_projects')
    .insert({ project_id: projectId, session_key: sessionKey, notes });
  if (error) throw error;
}

export async function unsaveProject(projectId: string): Promise<void> {
  const sessionKey = getSessionKey();
  const { error } = await supabase
    .from('saved_projects')
    .delete()
    .eq('session_key', sessionKey)
    .eq('project_id', projectId);
  if (error) throw error;
}

export async function updateSavedNotes(projectId: string, notes: string): Promise<void> {
  const sessionKey = getSessionKey();
  const { error } = await supabase
    .from('saved_projects')
    .update({ notes })
    .eq('session_key', sessionKey)
    .eq('project_id', projectId);
  if (error) throw error;
}

export async function fetchSavedIds(): Promise<Set<string>> {
  const saved = await fetchSavedProjects();
  return new Set(saved.map((s) => s.project_id));
}
