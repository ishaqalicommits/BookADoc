import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaSignOutAlt, FaMoon, FaSun, FaHeartbeat } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-premium sticky-top" style={{ padding: '12px 0' }}>
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
                    <div className="d-flex align-items-center justify-content-center rounded-circle"
                        style={{
                            width: '36px', height: '36px',
                            background: 'linear-gradient(135deg, #0d9488, #0f766e)',
                            color: '#fff'
                        }}>
                        <FaHeartbeat size={18} />
                    </div>
                    <span className="logo-text fs-4">BookADoc</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/doctors" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Find Doctors</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about" style={{ fontWeight: 500, fontSize: '0.9rem' }}>About</Link>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center gap-2">
                        <button
                            className="btn btn-link p-1"
                            onClick={() => setDarkMode(!darkMode)}
                            style={{ color: 'var(--txt-secondary)' }}
                        >
                            {darkMode ? <FaSun size={18} className="text-warning" /> : <FaMoon size={18} />}
                        </button>
                        {user ? (
                            <div className="dropdown">
                                <button className="btn btn-premium dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown"
                                    style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                                    <FaUserCircle size={16} /> {user.name}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><Link className="dropdown-item" to={
                                        user.role === 'Admin' ? '/admin/dashboard' :
                                        user.role === 'Doctor' ? '/doctor/dashboard' :
                                        '/patient/dashboard'
                                    }>Dashboard</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item text-danger" onClick={handleLogout}><FaSignOutAlt className="me-2" /> Logout</button></li>
                                </ul>
                            </div>
                        ) : (
                            <div className="d-flex gap-2">
                                <Link className="btn px-3 py-2" to="/login" style={{
                                    color: 'var(--teal-700)',
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    border: '1px solid var(--border)',
                                    borderRadius: '10px',
                                    background: 'var(--bg-card)'
                                }}>Login</Link>
                                <Link className="btn btn-premium px-3 py-2" to="/register" style={{ fontSize: '0.85rem' }}>Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
