import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  fetchSavedProjects,
  saveProject as dbSave,
  unsaveProject as dbUnsave,
  updateSavedNotes as dbUpdateNotes,
} from '@/lib/supabase';
import type { SavedProject } from '@/types';

type SavedContextValue = {
  saved: SavedProject[];
  savedIds: Set<string>;
  loading: boolean;
  error: string | null;
  isSaved: (projectId: string) => boolean;
  toggleSave: (projectId: string) => Promise<void>;
  updateNotes: (projectId: string, notes: string) => Promise<void>;
  refresh: () => Promise<void>;
};

const SavedContext = createContext<SavedContextValue | undefined>(undefined);

export function SavedProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<SavedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchSavedProjects();
      setSaved(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load saved projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const savedIds = new Set(saved.map((s) => s.project_id));

  const isSaved = useCallback(
    (projectId: string) => savedIds.has(projectId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [saved],
  );

  const toggleSave = useCallback(
    async (projectId: string) => {
      const currentlySaved = saved.some((s) => s.project_id === projectId);
      // Optimistic update
      if (currentlySaved) {
        setSaved((prev) => prev.filter((s) => s.project_id !== projectId));
      } else {
        const optimistic: SavedProject = {
          id: `temp_${projectId}`,
          project_id: projectId,
          session_key: '',
          notes: '',
          created_at: new Date().toISOString(),
        };
        setSaved((prev) => [optimistic, ...prev]);
      }
      try {
        if (currentlySaved) {
          await dbUnsave(projectId);
        } else {
          await dbSave(projectId);
        }
        await refresh();
      } catch (e) {
        // Revert on failure
        await refresh();
        setError(e instanceof Error ? e.message : 'Failed to update saved project');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [saved, refresh],
  );

  const updateNotes = useCallback(
    async (projectId: string, notes: string) => {
      setSaved((prev) =>
        prev.map((s) => (s.project_id === projectId ? { ...s, notes } : s)),
      );
      try {
        await dbUpdateNotes(projectId, notes);
      } catch (e) {
        await refresh();
        setError(e instanceof Error ? e.message : 'Failed to update notes');
      }
    },
    [refresh],
  );

  return (
    <SavedContext.Provider
      value={{ saved, savedIds, loading, error, isSaved, toggleSave, updateNotes, refresh }}
    >
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error('useSaved must be used within SavedProvider');
  return ctx;
}
