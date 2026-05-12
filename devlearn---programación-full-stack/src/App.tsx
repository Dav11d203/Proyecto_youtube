import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentAdvances from './pages/StudentAdvances';
import ManageAccounts from './pages/ManageAccounts';
import AdminProgress from './pages/AdminProgress';
import AboutUs from './pages/AboutUs';
import AuthModal from './components/AuthModal';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';

// Guard para rutas solo de admin
function AdminRoute({ children }: { children: React.ReactNode }) {
  try {
    const raw = localStorage.getItem('user');
    const user = raw ? JSON.parse(raw) : null;
    if (!user || user.role !== 'ADMIN') return <Navigate to="/" replace />;
    return <>{children}</>;
  } catch {
    return <Navigate to="/" replace />;
  }
}

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen text-white selection:bg-cyan-400/30">
        <Navbar onOpenAuth={() => setIsAuthModalOpen(true)} />

        <Routes>
          {/* Públicas */}
          <Route path="/"          element={<Home onOpenAuth={() => setIsAuthModalOpen(true)} />} />
          <Route path="/cursos"    element={<Courses />} />
          <Route path="/cursos/:id" element={<CourseDetail />} />
          <Route path="/contacto"  element={<Contact />} />
          <Route path="/login"     element={<Login />} />
          <Route path="/register"  element={<Register />} />
          <Route path="/nosotros"  element={<AboutUs />} />
          <Route path="/perfil"    element={<Profile />} />

          {/* Solo ADMIN */}
          <Route path="/admin/progreso"    element={<AdminRoute><AdminProgress /></AdminRoute>} />
          <Route path="/admin/estudiantes" element={<AdminRoute><ManageAccounts /></AdminRoute>} />
          <Route path="/avances"           element={<AdminRoute><StudentAdvances /></AdminRoute>} />
          <Route path="/cuentas"           element={<AdminRoute><ManageAccounts /></AdminRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
