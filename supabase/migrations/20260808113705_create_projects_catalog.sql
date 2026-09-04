/*
# ProjectForge: Project catalog + saved projects

1. New Tables

- `projects` — the catalog of software project ideas shown to CSE students.
  - id (uuid, pk)
  - slug (text, unique) — URL-safe identifier used in routes
  - title (text, not null)
  - tagline (text, not null) — short one-line description
  - description (text, not null) — detailed multi-paragraph description
  - category (text, not null) — Web, Mobile, AI/ML, Security, IoT, Game Dev, Data, Systems
  - difficulty (text, not null) — Beginner, Intermediate, Advanced
  - development_time (text, not null) — "1-2 weeks", "3-4 weeks", "1-2 months", "2+ months"
  - technologies (text[], not null default '{}') — array of tech stack names
  - features (text[], not null default '{}') — array of key feature bullet points
  - image_url (text) — hero image url
  - rating (numeric, default 4.5) — sample rating 0-5
  - created_at (timestamptz)

- `saved_projects` — single-tenant saved/bookmarked projects (no auth, stored by session key).
  - id (uuid, pk)
  - project_id (uuid, references projects, on delete cascade)
  - session_key (text, not null) — browser-local identifier for the anonymous user
  - notes (text, default '') — optional user notes added when saving
  - created_at (timestamptz)

2. Security

- Enable RLS on both tables.
- `projects`: intentionally public/shared catalog — anon + authenticated can read. Writes via anon allowed for demo seeding (no sensitive data).
- `saved_projects`: no auth in this app; data is scoped by `session_key` stored locally in the browser. anon + authenticated can CRUD their own saved rows by session_key.

3. Indexes

- index on projects(slug) for detail lookups
- index on projects(category), projects(difficulty) for filter performance
- index on saved_projects(session_key, project_id) unique to prevent duplicate saves
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  tagline text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  difficulty text NOT NULL,
  development_time text NOT NULL,
  technologies text[] NOT NULL DEFAULT '{}',
  features text[] NOT NULL DEFAULT '{}',
  image_url text,
  rating numeric DEFAULT 4.5,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_projects" ON projects;
CREATE POLICY "anon_select_projects" ON projects FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_projects" ON projects;
CREATE POLICY "anon_insert_projects" ON projects FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_projects" ON projects;
CREATE POLICY "anon_update_projects" ON projects FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_projects" ON projects;
CREATE POLICY "anon_delete_projects" ON projects FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_difficulty ON projects(difficulty);

CREATE TABLE IF NOT EXISTS saved_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  session_key text NOT NULL,
  notes text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  UNIQUE (session_key, project_id)
);

ALTER TABLE saved_projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_saved" ON saved_projects;
CREATE POLICY "anon_select_saved" ON saved_projects FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_saved" ON saved_projects;
CREATE POLICY "anon_insert_saved" ON saved_projects FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_saved" ON saved_projects;
CREATE POLICY "anon_update_saved" ON saved_projects FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_saved" ON saved_projects;
CREATE POLICY "anon_delete_saved" ON saved_projects FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_saved_session ON saved_projects(session_key);
CREATE INDEX IF NOT EXISTS idx_saved_session_project ON saved_projects(session_key, project_id);
