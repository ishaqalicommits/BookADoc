import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaUserShield } from 'react-icons/fa';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Patient' // default role
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (selectedRole) => {
        setFormData({ ...formData, role: selectedRole });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            if (formData.role === 'Admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/patient/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register');
        }
    };

    return (
        <div className="container py-5 d-flex align-items-center justify-content-center" style={{ minHeight: '90vh' }}>
            <div className="shadow-lg animate-fade-in" style={{ maxWidth: '600px', width: '100%', borderRadius: '16px', backgroundColor: '#ffffff', overflow: 'hidden' }}>
                
                {/* Header Section */}
                <div className="p-4 p-md-5" style={{ backgroundColor: '#09695f', color: '#ffffff' }}>
                    <div className="d-flex align-items-center gap-2 mb-4">
                        <div className="d-inline-flex align-items-center justify-content-center rounded" style={{ width: '32px', height: '32px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                            <FaBuilding size={16} />
                        </div>
                        <h5 className="mb-0 fw-bold" style={{ letterSpacing: '0.5px' }}>BookADoc</h5>
                    </div>
                    <h2 className="fw-bold mb-2">Create Your Account</h2>
                    <p className="mb-0" style={{ opacity: 0.9, fontSize: '0.95rem' }}>Join thousands of patients and doctors on BookADoc</p>
                </div>

                {/* Form Section */}
                <div className="p-4 p-md-5">
                    {error && <div className="alert alert-danger py-2">{error}</div>}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label text-muted small fw-bold mb-3 d-block" style={{ fontSize: '0.8rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>I am a</label>
                            <div className="d-flex gap-3">
                                <div 
                                    className="flex-fill text-center rounded p-3 cursor-pointer" 
                                    onClick={() => handleRoleChange('Patient')}
                                    style={{ 
                                        border: formData.role === 'Patient' ? '2px solid #33a89e' : '1px solid #e2e8f0',
                                        backgroundColor: formData.role === 'Patient' ? '#b4dcd8' : '#ffffff',
                                        color: formData.role === 'Patient' ? '#33a89e' : '#64748b',
                                        transition: 'all 0.2s ease',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    <FaUser className="me-2" /> Patient
                                </div>
                                <div 
                                    className="flex-fill text-center rounded p-3 cursor-pointer" 
                                    onClick={() => handleRoleChange('Admin')}
                                    style={{ 
                                        border: formData.role === 'Admin' ? '2px solid #33a89e' : '1px solid #e2e8f0',
                                        backgroundColor: formData.role === 'Admin' ? '#b4dcd8' : '#ffffff',
                                        color: formData.role === 'Admin' ? '#33a89e' : '#64748b',
                                        transition: 'all 0.2s ease',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    <FaUserShield className="me-2" /> Admin
                                </div>
                            </div>
                        </div>

                        <p className="small mb-4" style={{ color: '#64748b', lineHeight: 1.5 }}>
                            Doctor accounts are created by administrators only. If you need a doctor account, please contact your administrator.
                        </p>

                        <div className="row g-3 mb-3">
                            <div className="col-md-6">
                                <label className="form-label text-muted fw-bold" style={{ fontSize: '0.8rem' }}>Full Name</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: '#e2e8f0' }}><FaUser style={{ color: '#94a3b8' }} /></span>
                                    <input 
                                        name="name" 
                                        className="form-control border-start-0 ps-0 shadow-none" 
                                        style={{ borderColor: '#e2e8f0', padding: '10px' }}
                                        placeholder="John Doe"
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label text-muted fw-bold" style={{ fontSize: '0.8rem' }}>Email Address</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: '#e2e8f0' }}><FaEnvelope style={{ color: '#94a3b8' }} /></span>
                                    <input 
                                        name="email" 
                                        type="email" 
                                        className="form-control border-start-0 ps-0 shadow-none" 
                                        style={{ borderColor: '#e2e8f0', padding: '10px' }}
                                        placeholder="you@example.com"
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label text-muted fw-bold" style={{ fontSize: '0.8rem' }}>Password</label>
                            <div className="input-group">
                                <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: '#e2e8f0' }}><FaLock style={{ color: '#94a3b8' }} /></span>
                                <input 
                                    name="password" 
                                    type="password" 
                                    className="form-control border-start-0 ps-0 shadow-none" 
                                    style={{ borderColor: '#e2e8f0', padding: '10px' }}
                                    placeholder="••••••••"
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="btn w-100 fw-bold mb-4 shadow-sm" 
                            style={{ 
                                backgroundColor: '#09695f', 
                                color: '#ffffff', 
                                padding: '14px', 
                                borderRadius: '8px',
                                fontSize: '1rem'
                            }}
                        >
                            Create Account
                        </button>
                        
                        <p className="text-center mb-0" style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                            Already have an account? <Link to="/login" style={{ color: '#33a89e', fontWeight: 700, textDecoration: 'none' }}>Sign in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
