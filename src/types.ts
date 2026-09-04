export type Project = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  difficulty: string;
  development_time: string;
  technologies: string[];
  features: string[];
  image_url: string | null;
  rating: number;
  created_at: string;
};

export type SavedProject = {
  id: string;
  project_id: string;
  session_key: string;
  notes: string;
  created_at: string;
  project?: Project;
};

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type DevelopmentTime = '1-2 weeks' | '3-4 weeks' | '1-2 months' | '2+ months';

export const CATEGORIES = [
  'Web',
  'Mobile',
  'AI/ML',
  'Security',
  'IoT',
  'Game Dev',
  'Data',
  'Systems',
] as const;

export const DIFFICULTIES: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced'];

export const DEVELOPMENT_TIMES: DevelopmentTime[] = [
  '1-2 weeks',
  '3-4 weeks',
  '1-2 months',
  '2+ months',
];

export const ALL_TECHNOLOGIES = [
  'React', 'TypeScript', 'JavaScript', 'Python', 'Node.js', 'Flask', 'FastAPI',
  'PostgreSQL', 'SQLite', 'MongoDB', 'Tailwind CSS', 'Next.js', 'React Native',
  'Flutter', 'Dart', 'Swift', 'Kotlin', 'TensorFlow', 'PyTorch', 'Keras',
  'scikit-learn', 'OpenAI API', 'LangChain', 'WebRTC', 'Socket.io', 'D3.js',
  'Chart.js', 'Rust', 'C++', 'C', 'Solidity', 'Ethereum', 'ESP32', 'Raspberry Pi',
  'OpenCV', 'MQTT', 'Redis', 'Prisma', 'Firebase', 'Lua', 'SDL2', 'Pygame',
  'Web Crypto API', 'WebExtensions API', 'ncurses', 'Linux', 'CMake',
] as const;
