import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaHeartbeat } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(email, password);
            if (userData.role === 'Admin') navigate('/admin/dashboard');
            else if (userData.role === 'Doctor') navigate('/doctor/dashboard');
            else navigate('/patient/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login');
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
            <div className="glass-card p-5 animate-fade-in" style={{ maxWidth: '450px', width: '100%' }}>
                <div className="text-center mb-4">
                    <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: '64px', height: '64px', background: 'var(--teal-50)', color: 'var(--teal-600)' }}>
                        <FaHeartbeat size={32} />
                    </div>
                    <h2 className="fw-bold" style={{ color: 'var(--txt-primary)' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--txt-secondary)', fontSize: '0.9rem' }}>Log in to access your healthcare dashboard</p>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <div className="input-group">
                            <span className="input-group-text bg-transparent" style={{ borderColor: 'var(--border)' }}><FaEnvelope style={{ color: 'var(--txt-muted)' }} /></span>
                            <input 
                                type="email" 
                                className="form-control border-start-0 ps-0" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Password</label>
                        <div className="input-group">
                            <span className="input-group-text bg-transparent" style={{ borderColor: 'var(--border)' }}><FaLock style={{ color: 'var(--txt-muted)' }} /></span>
                            <input 
                                type="password" 
                                className="form-control border-start-0 ps-0" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-premium w-100 mb-3" style={{ padding: '12px', fontSize: '1rem' }}>Sign In</button>
                    <p className="text-center mb-0" style={{ fontSize: '0.9rem' }}>Don't have an account? <Link to="/register" style={{ color: 'var(--teal-600)', fontWeight: 600, textDecoration: 'none' }}>Register Here</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
