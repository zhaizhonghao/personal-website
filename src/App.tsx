import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ResearchPage from './pages/ResearchPage';
import ProjectsPage from './pages/ProjectsPage';
import StudentsPage from './pages/StudentsPage';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/students" element={<StudentsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
