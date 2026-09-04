/*
# Seed ProjectForge catalog with realistic sample projects

Inserts ~24 realistic software project ideas across categories:
Web, Mobile, AI/ML, Security, IoT, Game Dev, Data, Systems.
Each has realistic technologies, features, difficulty, and development time.
Idempotent: uses ON CONFLICT (slug) DO UPDATE so re-running updates rows in place.
*/

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'ai-powered-study-companion',
  'AI-Powered Study Companion',
  'A smart study assistant that generates summaries, flashcards, and quizzes from your notes using NLP.',
  'Build an AI-powered study companion that helps students learn more efficiently. The app takes in lecture notes or textbook chapters and automatically generates concise summaries, flashcards, and practice quizzes using natural language processing. It tracks the student''s progress over time, identifies weak areas through spaced repetition, and adapts its recommendations accordingly. This project demonstrates practical integration of large language model APIs, spaced-repetition algorithms, and a clean educational UI. It is an excellent capstone for students interested in the intersection of AI and edtech.',
  'AI/ML', 'Advanced', '2+ months',
  ARRAY['Python', 'FastAPI', 'React', 'OpenAI API', 'PostgreSQL', 'LangChain'],
  ARRAY['Automatic summary generation from uploaded notes', 'Flashcard creation with spaced-repetition scheduling', 'Adaptive quizzes that target weak topics', 'Progress dashboard with learning streaks', 'PDF and markdown ingestion'],
  'https://images.pexels.com/photos/17483870/pexels-photo-17483870.png?auto=compress&cs=tinysrgb&h=650&w=940',
  4.8
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'realtime-collaborative-code-editor',
  'Realtime Collaborative Code Editor',
  'A Google Docs-style code editor where multiple developers can edit the same file simultaneously.',
  'Create a realtime collaborative code editor inspired by Google Docs. Multiple users can join a shared workspace, edit code files simultaneously, and see each other''s cursors and changes live. The project uses operational transformation or CRDTs to resolve conflicts, WebSocket connections for realtime sync, and a Monaco-based editor for a VS Code-like experience. This is a strong systems-level project that teaches concurrency, conflict resolution, and low-latency networking.',
  'Web', 'Advanced', '2+ months',
  ARRAY['Node.js', 'Socket.io', 'React', 'Monaco Editor', 'Redis', 'TypeScript'],
  ARRAY['Realtime multi-user editing with live cursors', 'Operational transformation for conflict resolution', 'Syntax highlighting for 20+ languages', 'Shared rooms with invite links', 'Version history and replay'],
  'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.7
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'expense-tracker-mobile-app',
  'Personal Expense Tracker App',
  'A mobile app to track spending, set budgets, and visualize financial habits with charts.',
  'Design and build a cross-platform mobile expense tracker. Users log transactions, categorize them, set monthly budgets, and receive alerts when nearing limits. The app generates visual reports showing spending trends over time, and supports receipt photo capture with OCR to auto-fill amounts. This project is ideal for students learning mobile development, state management, and local persistence with SQLite or a cloud backend.',
  'Mobile', 'Intermediate', '3-4 weeks',
  ARRAY['React Native', 'Expo', 'SQLite', 'TypeScript', 'Chart Kit', 'AsyncStorage'],
  ARRAY['Transaction logging with categories and tags', 'Monthly budget setting with overspend alerts', 'Interactive charts for spending trends', 'Receipt photo capture with OCR amount extraction', 'Export reports as CSV or PDF'],
  'https://images.pexels.com/photos/969462/pexels-photo-969462.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.5
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'network-intrusion-detection-system',
  'Network Intrusion Detection System',
  'A packet-sniffing tool that detects suspicious network activity using rule-based and ML anomaly detection.',
  'Build a network intrusion detection system that monitors traffic in realtime and flags suspicious activity. The tool captures packets, inspects them against a rule database (like a mini Snort), and uses a machine learning model to detect anomalous patterns that rules might miss. Alerts are logged with timestamps, source IPs, and severity levels. This is a great security-focused project for students interested in network protocols, packet analysis, and applied machine learning.',
  'Security', 'Advanced', '2+ months',
  ARRAY['Python', 'Scapy', 'Scikit-learn', 'Wireshark', 'Elasticsearch', 'Flask'],
  ARRAY['Realtime packet capture and inspection', 'Rule-based signature matching engine', 'ML-based anomaly detection on traffic patterns', 'Alert dashboard with severity scoring', 'Historical traffic analysis and reporting'],
  'https://images.pexels.com/photos/5380682/pexels-photo-5380682.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.6
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'smart-home-iot-dashboard',
  'Smart Home IoT Dashboard',
  'Monitor and control home sensors and devices from a web dashboard with realtime updates.',
  'Create a smart home IoT dashboard that connects to sensors (temperature, humidity, motion, light) and actuators (smart plugs, LEDs) via MQTT. The web dashboard displays live sensor readings, historical graphs, and toggles for controlling devices. Users can set automation rules like "turn on the light when motion is detected after sunset." This project is perfect for students exploring IoT protocols, embedded communication, and full-stack dashboards.',
  'IoT', 'Intermediate', '3-4 weeks',
  ARRAY['ESP32', 'MQTT', 'React', 'Node.js', 'InfluxDB', 'Chart.js'],
  ARRAY['Realtime sensor data display via MQTT', 'Historical data graphs with selectable time ranges', 'Device toggle controls with status feedback', 'Automation rule builder with triggers and actions', 'Mobile-responsive dashboard layout'],
  'https://images.pexels.com/photos/15470542/pexels-photo-15470542.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.4
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  '2d-platformer-game-engine',
  '2D Platformer Game Engine',
  'A custom 2D game engine with physics, level editor, and asset management for building platformer games.',
  'Develop a 2D platformer game engine from scratch. The engine handles physics (gravity, collision detection, jumping), sprite animation, tile-based level rendering, and a camera system that follows the player. It includes a visual level editor where you can place tiles, enemies, and collectibles, plus a simple asset pipeline for sprites and sound effects. This project is a deep dive into game architecture, physics simulation, and rendering pipelines.',
  'Game Dev', 'Advanced', '2+ months',
  ARRAY['C++', 'SDL2', 'OpenGL', 'Lua', 'CMake'],
  ARRAY['Custom physics engine with AABB collision detection', 'Tile-based level rendering with camera scrolling', 'Visual level editor with drag-and-drop placement', 'Sprite animation system with frame management', 'Lua scripting for enemy behavior and game logic'],
  'https://images.pexels.com/photos/14629387/pexels-photo-14629387.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.7
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'data-visualization-dashboard',
  'Interactive Data Visualization Dashboard',
  'A dashboard that connects to public datasets and renders interactive, filterable charts and maps.',
  'Build an interactive data visualization dashboard that pulls from public APIs and datasets (weather, census, COVID, finance). Users can filter data by date range, region, and category, and the dashboard updates charts, heatmaps, and geographic maps in realtime. The project emphasizes data processing pipelines, charting libraries, and responsive layout design. It is ideal for students interested in data engineering and analytics.',
  'Data', 'Intermediate', '3-4 weeks',
  ARRAY['React', 'D3.js', 'Python', 'Pandas', 'FastAPI', 'Mapbox'],
  ARRAY['Multiple chart types: bar, line, scatter, heatmap', 'Geographic map visualization with region overlays', 'Date range and category filters with live updates', 'Data pipeline from public APIs with caching', 'Export visualizations as images or CSV'],
  'https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.5
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'custom-key-value-store',
  'Custom Key-Value Database',
  'Build a persistent key-value store from scratch with an LSM-tree and a query language.',
  'Implement a persistent key-value database engine from scratch. The project covers log-structured merge trees, write-ahead logging, compaction strategies, and a simple SQL-like query interface. It supports GET, PUT, DELETE, and range scans with persistence to disk. Benchmark it against Redis for read/write throughput. This is a fantastic systems project for students who want to understand how databases work under the hood.',
  'Systems', 'Advanced', '2+ months',
  ARRAY['Rust', 'C', 'Linux', 'Benchmarks'],
  ARRAY['LSM-tree storage engine with SSTable files', 'Write-ahead log for crash recovery', 'Background compaction with size-tiered strategy', 'SQL-like query interface with range scans', 'Benchmark suite comparing throughput to Redis'],
  'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.8
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'weather-forecast-web-app',
  'Weather Forecast Web App',
  'A clean weather app with hourly and 7-day forecasts using a public weather API.',
  'Create a responsive weather forecast web app that fetches data from a public weather API. Users search for a city or use geolocation to see current conditions, an hourly forecast for the next 24 hours, and a 7-day outlook. The app includes animated weather icons, a temperature unit toggle, and a clean, accessible interface. This is a great beginner project for learning API integration, async state, and responsive design.',
  'Web', 'Beginner', '1-2 weeks',
  ARRAY['React', 'OpenWeather API', 'Tailwind CSS', 'TypeScript'],
  ARRAY['Current weather conditions with animated icons', 'Hourly forecast for the next 24 hours', '7-day outlook with high/low temperatures', 'City search with geolocation fallback', 'Celsius and Fahrenheit unit toggle'],
  'https://images.pexels.com/photos/97077/pexels-photo-97077.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.2
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'image-classifier-cnn',
  'Image Classifier with CNN',
  'Train a convolutional neural network to classify images into categories with a web demo.',
  'Build an image classification model using a convolutional neural network. Train the model on a dataset like CIFAR-10 or a custom collection, then deploy it behind a simple web interface where users upload an image and receive a prediction with confidence scores. The project covers data preprocessing, model architecture design, training and validation, and model serving. It is a solid introduction to practical deep learning.',
  'AI/ML', 'Intermediate', '3-4 weeks',
  ARRAY['Python', 'TensorFlow', 'Keras', 'Flask', 'NumPy'],
  ARRAY['CNN model trained on CIFAR-10 or custom dataset', 'Web interface for image upload and prediction', 'Confidence scores for top-5 predictions', 'Training metrics visualization with TensorBoard', 'Model export and load for inference'],
  'https://images.pexels.com/photos/17485657/pexels-photo-17485657.png?auto=compress&cs=tinysrgb&h=650&w=940',
  4.4
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'password-manager-extension',
  'Password Manager Browser Extension',
  'A browser extension that securely stores and autofills passwords using local encryption.',
  'Develop a password manager browser extension that stores credentials encrypted in local storage. The extension generates strong passwords, autofills login forms, and organizes credentials by site. All encryption and decryption happen client-side using AES-GCM with a master password-derived key. This project teaches browser extension APIs, applied cryptography, and secure client-side storage.',
  'Security', 'Intermediate', '3-4 weeks',
  ARRAY['JavaScript', 'WebExtensions API', 'Web Crypto API', 'HTML', 'CSS'],
  ARRAY['AES-GCM encryption with master password key derivation', 'Strong password generator with customizable rules', 'Autofill login forms on recognized sites', 'Credential vault organized by domain', 'Import and export encrypted vault backup'],
  'https://images.pexels.com/photos/5380666/pexels-photo-5380666.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.3
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'fitness-tracker-app',
  'Fitness Tracker Mobile App',
  'Track workouts, count steps via sensors, and visualize progress with goals and streaks.',
  'Build a fitness tracker mobile app that logs workouts, counts steps using the phone''s accelerometer, and visualizes progress toward daily and weekly goals. The app supports custom workout routines, rest timers, and a streak system for daily activity. Data syncs to a cloud backend so progress persists across devices. This is a practical mobile project with sensor integration and health data visualization.',
  'Mobile', 'Intermediate', '3-4 weeks',
  ARRAY['Flutter', 'Dart', 'Firebase', 'SQLite', 'Health APIs'],
  ARRAY['Workout logger with custom exercises and sets', 'Step counting via device accelerometer', 'Daily and weekly goal tracking with streaks', 'Rest timer with notifications', 'Cloud sync for cross-device progress'],
  'https://images.pexels.com/photos/4709369/pexels-photo-4709369.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.3
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'devto-clone-blog-platform',
  'Developer Blog Platform',
  'A DEV.to-style blogging platform with markdown, syntax highlighting, and tags.',
  'Create a developer-focused blogging platform where users write posts in markdown, with syntax-highlighted code blocks, tag-based filtering, and a feed of trending articles. The platform supports user profiles, comments, reactions, and a draft-and-publish workflow. This is a full-stack web project that covers authentication, rich content rendering, and social features.',
  'Web', 'Intermediate', '3-4 weeks',
  ARRAY['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'NextAuth'],
  ARRAY['Markdown editor with live preview and syntax highlighting', 'Tag-based article discovery and filtering', 'User profiles with published post history', 'Comments and reactions on articles', 'Draft and publish workflow with scheduling'],
  'https://images.pexels.com/photos/34804007/pexels-photo-34804007.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.4
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'chat-application-with-webrtc',
  'Video Chat Application',
  'A peer-to-peer video chat app with WebRTC, rooms, and screen sharing.',
  'Build a peer-to-peer video chat application using WebRTC. Users create or join rooms, share their camera and microphone, and invite others via a link. The app supports screen sharing, text chat alongside video, and mute and camera toggle controls. A signaling server coordinates the connection setup. This project teaches realtime peer-to-peer networking, media handling, and signaling protocols.',
  'Web', 'Advanced', '2+ months',
  ARRAY['WebRTC', 'Node.js', 'Socket.io', 'React', 'TypeScript'],
  ARRAY['Peer-to-peer video and audio calls via WebRTC', 'Room-based invitations with shareable links', 'Screen sharing for presentations and demos', 'In-call text chat alongside video', 'Mute, camera toggle, and participant list'],
  'https://images.pexels.com/photos/7988745/pexels-photo-7988745.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.6
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'stock-market-predictor',
  'Stock Market Trend Predictor',
  'Predict stock price trends using time-series forecasting and sentiment analysis.',
  'Develop a stock market trend predictor that combines historical price data with news sentiment analysis. The model uses time-series forecasting (LSTM) on price history and a sentiment model on recent news headlines to predict short-term trend direction. A dashboard shows predictions, confidence intervals, and the sentiment feed. This project is a great blend of data engineering, NLP, and deep learning.',
  'AI/ML', 'Advanced', '2+ months',
  ARRAY['Python', 'PyTorch', 'Pandas', 'NLTK', 'Streamlit', 'yfinance'],
  ARRAY['LSTM model for time-series price forecasting', 'News sentiment analysis with NLP', 'Prediction dashboard with confidence intervals', 'Historical backtesting against real prices', 'Realtime news feed with sentiment scoring'],
  'https://images.pexels.com/photos/38808473/pexels-photo-38808473.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.5
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'todo-app-with-gamification',
  'Gamified Todo App',
  'A task manager with XP, levels, and achievements to make productivity fun.',
  'Build a gamified todo application that turns task completion into a game. Users earn XP and level up by completing tasks, unlock achievements for streaks and milestones, and see a progress ring for daily goals. The app supports task categories, priorities, due dates, and a Pomodoro timer built in. This is a fun beginner-to-intermediate project that covers state management, persistence, and engaging UI design.',
  'Web', 'Beginner', '1-2 weeks',
  ARRAY['React', 'Tailwind CSS', 'TypeScript', 'localStorage'],
  ARRAY['Task creation with categories, priorities, and due dates', 'XP and leveling system for task completion', 'Achievement badges for streaks and milestones', 'Daily progress ring and goal tracking', 'Built-in Pomodoro focus timer'],
  'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.1
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'ar-shopping-furniture-app',
  'AR Furniture Shopping App',
  'An augmented reality app that lets users preview furniture in their room before buying.',
  'Create an augmented reality mobile app for furniture shopping. Users browse a catalog, select a piece, and use AR to place a true-to-scale 3D model in their room through the camera. They can resize, rotate, and capture a photo of the placement. This project covers AR frameworks, 3D model rendering, and mobile UX. It is an impressive, portfolio-worthy mobile project.',
  'Mobile', 'Advanced', '2+ months',
  ARRAY['Swift', 'ARKit', 'SceneKit', 'Firebase', 'Figma'],
  ARRAY['AR placement of true-to-scale 3D furniture models', 'Catalog browser with filters and search', 'Resize, rotate, and reposition placed models', 'Photo capture of AR scene for sharing', 'Wishlist and cart with cloud sync'],
  'https://images.pexels.com/photos/10920328/pexels-photo-10920328.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.6
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'caesar-cipher-toolkit',
  'Cipher Toolkit for Education',
  'An interactive tool to learn classical ciphers with encryption, decryption, and cracking.',
  'Build an educational cipher toolkit that lets students experiment with classical ciphers like Caesar, Vigenere, and RSA. Users can encrypt and decrypt text, visualize how the cipher works step-by-step, and try frequency-analysis cracking tools. The toolkit includes lessons and challenges. This is an accessible beginner security project that builds intuition for cryptography fundamentals.',
  'Security', 'Beginner', '1-2 weeks',
  ARRAY['Python', 'Flask', 'JavaScript', 'HTML', 'CSS'],
  ARRAY['Caesar, Vigenere, and RSA encryption and decryption', 'Step-by-step visual cipher walkthrough', 'Frequency analysis cracking tool', 'Interactive lessons and cipher challenges', 'Cipher history and explanation reference'],
  'https://images.pexels.com/photos/5935787/pexels-photo-5935787.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.0
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'snake-game-with-ai-agent',
  'Snake Game with AI Agent',
  'The classic Snake game with a reinforcement learning agent that learns to play on its own.',
  'Implement the classic Snake game and train an AI agent to play it using reinforcement learning. The project includes the game engine, a training loop with a deep Q-network, and a visual mode to watch the trained agent play. Compare the AI''s performance to a heuristic baseline. This is a fun, visual AI project that connects game development with machine learning.',
  'Game Dev', 'Intermediate', '3-4 weeks',
  ARRAY['Python', 'PyTorch', 'Pygame', 'NumPy'],
  ARRAY['Classic Snake game engine with grid rendering', 'Deep Q-network reinforcement learning agent', 'Training loop with experience replay', 'Visual mode to watch the trained agent play', 'Performance comparison to heuristic baseline'],
  'https://images.pexels.com/photos/14205160/pexels-photo-14205160.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.4
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'smart-traffic-light-system',
  'Smart Traffic Light System',
  'An IoT traffic light controller that adapts timing based on realtime vehicle flow using camera detection.',
  'Build a smart traffic light system that adapts signal timing based on realtime vehicle detection. A camera feed at an intersection is processed with computer vision to count vehicles in each lane, and a timing algorithm adjusts green-light durations to optimize flow. The system can be simulated in software or deployed with edge hardware. This project combines IoT, computer vision, and optimization.',
  'IoT', 'Advanced', '2+ months',
  ARRAY['Raspberry Pi', 'OpenCV', 'Python', 'MQTT', 'TensorFlow Lite'],
  ARRAY['Realtime vehicle detection via camera with OpenCV', 'Adaptive signal timing algorithm based on traffic flow', 'Simulation mode for testing without hardware', 'Web dashboard for monitoring intersection stats', 'Emergency vehicle priority detection'],
  'https://images.pexels.com/photos/15470540/pexels-photo-15470540.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.5
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'sentiment-analysis-twitter',
  'Twitter Sentiment Analyzer',
  'Analyze realtime social media sentiment on any topic with NLP and a live dashboard.',
  'Create a sentiment analysis tool that streams social media posts on a given topic and classifies sentiment in realtime. The dashboard shows a sentiment timeline, word cloud, and geographic breakdown of posts. The NLP model handles sarcasm detection and emoji interpretation. This project covers streaming data, NLP, and live data visualization.',
  'Data', 'Intermediate', '3-4 weeks',
  ARRAY['Python', 'Tweepy', 'TextBlob', 'React', 'D3.js', 'WebSocket'],
  ARRAY['Realtime streaming ingestion of social media posts', 'NLP sentiment classification with sarcasm handling', 'Sentiment timeline and live gauge dashboard', 'Word cloud of frequently used terms', 'Geographic sentiment heatmap'],
  'https://images.pexels.com/photos/10020092/pexels-photo-10020092.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.3
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'task-scheduler-and-os-shell',
  'Mini OS Shell and Task Scheduler',
  'A simulated operating system shell with process scheduling, memory management, and a CLI.',
  'Build a simulated operating system with a command-line shell, a process scheduler, and a simple memory manager. Users launch processes, view the ready queue, and observe scheduling algorithms like Round Robin and Priority Scheduling in action. The memory manager handles allocation and deallocation with visual blocks. This is an excellent systems project for understanding OS fundamentals.',
  'Systems', 'Intermediate', '3-4 weeks',
  ARRAY['C', 'Linux', 'Make', 'ncurses'],
  ARRAY['Command-line shell with piped commands', 'Process scheduler with Round Robin and Priority modes', 'Memory manager with visual allocation blocks', 'Process lifecycle: create, run, block, terminate', 'Resource deadlock detection simulation'],
  'https://images.pexels.com/photos/97077/pexels-photo-97077.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.5
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'portfolio-website-builder',
  'Portfolio Website Builder',
  'A drag-and-drop tool that lets students build and deploy a developer portfolio without coding.',
  'Create a portfolio website builder where students design a personal portfolio by choosing templates, dragging in sections, and filling in content. The builder handles responsive layout, theme customization, and one-click deploy to a static host. It includes preset sections for projects, skills, experience, and contact. This is a practical full-stack project with a focus on UX and deployment.',
  'Web', 'Intermediate', '3-4 weeks',
  ARRAY['React', 'DnD Kit', 'Tailwind CSS', 'Vercel API', 'TypeScript'],
  ARRAY['Drag-and-drop section arrangement with live preview', 'Multiple portfolio templates with theme customization', 'Preset sections: projects, skills, experience, contact', 'One-click deploy to static hosting', 'SEO and social meta tag generation'],
  'https://images.pexels.com/photos/6804068/pexels-photo-6804068.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.2
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'music-recommendation-engine',
  'Music Recommendation Engine',
  'A recommendation system that suggests songs based on listening history and audio features.',
  'Build a music recommendation engine that suggests songs based on a user''s listening history and audio feature similarity. The system uses collaborative filtering and content-based filtering on audio features like tempo, energy, and danceability. A simple player lets users preview recommended tracks and rate them, which feeds back into the recommendations. This project covers recommender systems, data processing, and hybrid filtering.',
  'AI/ML', 'Intermediate', '3-4 weeks',
  ARRAY['Python', 'Surprise', 'scikit-learn', 'Flask', 'Spotipy'],
  ARRAY['Collaborative filtering on user listening history', 'Content-based filtering using audio features', 'Hybrid recommendation combining both approaches', 'Track preview player with thumbs up and down', 'Recommendation explanation and similarity scores'],
  'https://images.pexels.com/photos/17483871/pexels-photo-17483871.png?auto=compress&cs=tinysrgb&h=650&w=940',
  4.3
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'recipe-finder-app',
  'Recipe Finder App',
  'A mobile app that suggests recipes based on ingredients you already have at home.',
  'Build a recipe finder mobile app where users enter ingredients they have, and the app suggests recipes they can make. The app filters by dietary preferences, cooking time, and meal type, and includes step-by-step instructions with timers. Users can save favorites and create shopping lists for missing ingredients. This is a practical beginner mobile project with API integration and offline caching.',
  'Mobile', 'Beginner', '1-2 weeks',
  ARRAY['Flutter', 'Dart', 'Spoonacular API', 'SQLite', 'Hive'],
  ARRAY['Ingredient-based recipe search', 'Dietary preference and cooking time filters', 'Step-by-step instructions with built-in timers', 'Favorite recipes and shopping list for missing items', 'Offline caching of saved recipes'],
  'https://images.pexels.com/photos/16229745/pexels-photo-16229745.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.1
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;

INSERT INTO projects (slug, title, tagline, description, category, difficulty, development_time, technologies, features, image_url, rating) VALUES
(
  'blockchain-voting-system',
  'Blockchain Voting System',
  'A secure, transparent voting system on a private blockchain with vote verification.',
  'Develop a blockchain-based voting system that records votes as immutable transactions on a private Ethereum network. Voters authenticate, cast votes, and verify their vote was recorded using a receipt. The system prevents double voting and provides a transparent, auditable tally. This project teaches smart contracts, decentralized architecture, and applied cryptography.',
  'Systems', 'Advanced', '2+ months',
  ARRAY['Solidity', 'Ethereum', 'React', 'Web3.js', 'Node.js'],
  ARRAY['Smart contract for secure vote recording on private Ethereum', 'Voter authentication with identity verification', 'Receipt-based vote verification without revealing choice', 'Double-vote prevention and tally transparency', 'Audit log of all blockchain transactions'],
  'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  4.7
) ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
  category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, development_time=EXCLUDED.development_time,
  technologies=EXCLUDED.technologies, features=EXCLUDED.features, image_url=EXCLUDED.image_url, rating=EXCLUDED.rating;
