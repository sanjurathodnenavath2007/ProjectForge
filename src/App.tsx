import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SavedProvider } from '@/context/SavedContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { HomePage } from '@/pages/HomePage';
import { GeneratorPage } from '@/pages/GeneratorPage';
import { ExplorePage } from '@/pages/ExplorePage';
import { ProjectDetailsPage } from '@/pages/ProjectDetailsPage';
import { SavedPage } from '@/pages/SavedPage';
import { AboutPage } from '@/pages/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <SavedProvider>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col bg-slate-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/generate" element={<GeneratorPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/project/:slug" element={<ProjectDetailsPage />} />
              <Route path="/saved" element={<SavedPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </SavedProvider>
    </BrowserRouter>
  );
}

export default App;
