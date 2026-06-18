import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Doctors from './pages/Doctors';
import DoctorDetails from './pages/DoctorDetails';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';




// Styling
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="animate-fade-in">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorDetails />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Patient Routes */}
            <Route path="/patient/dashboard" element={
              <ProtectedRoute roles={['Patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            } />

            {/* Doctor Routes */}
            <Route path="/doctor/dashboard" element={
              <ProtectedRoute roles={['Doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute roles={['Admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            <Route path="*" element={<div className="container py-5 text-center"><h2>404 - Page Not Found</h2></div>} />
          </Routes>
        </main>
        <footer className="py-5 glass-card mt-5 border-0 rounded-0 border-top bg-light">
          <div className="container text-center">
            <h4 className="logo-text mb-3">BookADoc</h4>
            <p className="text-muted mb-0">&copy; 2026 BookADoc Healthcare Inc. All rights reserved.</p>
            <div className="mt-3 small">
              <span className="mx-2">Privacy Policy</span>
              <span className="mx-2">Terms of Service</span>
            </div>
          </div>
        </footer>
      </Router>
    </AuthProvider>
  );
}

export default App;
