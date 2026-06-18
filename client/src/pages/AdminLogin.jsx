import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaShieldAlt } from 'react-icons/fa';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/admin/login', { email, password });
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        token: data.token,
      });
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="glass-card p-5 animate-fade-in" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: '64px', height: '64px', background: 'var(--teal-50)', color: 'var(--teal-600)' }}>
            <FaShieldAlt size={32} />
          </div>
          <h2 className="fw-bold" style={{ color: 'var(--txt-primary)' }}>Admin Access</h2>
          <p style={{ color: 'var(--txt-secondary)', fontSize: '0.9rem' }}>Secure login for system administrators</p>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={submitHandler}>
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
          <button type="submit" className="btn btn-premium w-100 mb-3" style={{ padding: '12px', fontSize: '1rem' }}>Access Dashboard</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
