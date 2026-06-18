import { Link } from 'react-router-dom';
import { FaUserMd, FaCalendarCheck, FaFileAlt, FaShieldAlt, FaHeartbeat, FaClock } from 'react-icons/fa';

const Home = () => {
    return (
        <div>
            {/* Hero Section — MediCare+ inspired dark teal hero */}
            <section className="position-relative" style={{
                background: 'linear-gradient(135deg, #0f766e 0%, #134e4a 60%, #0f172a 100%)',
                minHeight: '85vh',
                overflow: 'hidden'
            }}>
                <div className="container py-5">
                    <div className="row align-items-center" style={{ minHeight: '75vh' }}>
                        <div className="col-lg-7 animate-fade-in">
                            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-4" style={{
                                background: 'rgba(255,255,255,0.12)',
                                border: '1px solid rgba(255,255,255,0.2)'
                            }}>
                                <FaHeartbeat style={{ color: '#5eead4' }} />
                                <span style={{ color: '#ccfbf1', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                                    TRUSTED HEALTHCARE
                                </span>
                            </div>
                            <h1 className="fw-black mb-4" style={{
                                color: '#ffffff',
                                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                                lineHeight: 1.15,
                                letterSpacing: '-0.025em'
                            }}>
                                Your Health,<br />
                                <span style={{
                                    background: 'linear-gradient(135deg, #5eead4, #2dd4bf)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>Simplified.</span>
                            </h1>
                            <p className="mb-4" style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '560px' }}>
                                Find the best doctors and book appointments in seconds. Secure, fast, and reliable healthcare management at your fingertips.
                            </p>
                            <div className="d-flex gap-3 flex-wrap">
                                <Link to="/doctors" className="btn btn-premium px-4 py-2" style={{
                                    background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                                    boxShadow: '0 4px 20px rgba(20, 184, 166, 0.35)'
                                }}>Find a Doctor</Link>
                                <Link to="/register" className="btn px-4 py-2" style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    color: '#ffffff',
                                    borderRadius: '10px',
                                    fontWeight: 600
                                }}>Get Started →</Link>
                            </div>

                            {/* Quick Stats */}
                            <div className="d-flex gap-4 mt-5 flex-wrap">
                                {[
                                    { num: '500+', label: 'Doctors' },
                                    { num: '10k+', label: 'Patients' },
                                    { num: '25k+', label: 'Appointments' }
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div style={{ color: '#2dd4bf', fontSize: '1.5rem', fontWeight: 800 }}>{stat.num}</div>
                                        <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 500 }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-lg-5 d-none d-lg-block">
                            <div className="p-3 rounded-3" style={{
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '20px'
                            }}>
                                <img
                                    src="https://img.freepik.com/free-vector/doctors-concept-illustration_114360-1515.jpg"
                                    alt="Doctors"
                                    className="img-fluid"
                                    style={{ borderRadius: '16px' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bold" style={{ letterSpacing: '-0.02em', color: 'var(--txt-primary)' }}>
                        Why Choose <span className="logo-text">BookADoc</span>?
                    </h2>
                    <p style={{ color: 'var(--txt-secondary)', maxWidth: '500px', margin: '0 auto' }}>
                        Everything you need for modern healthcare management, all in one place.
                    </p>
                </div>

                <div className="row g-4 mb-5">
                    {[
                        { icon: <FaUserMd size={28} />, title: 'Top Doctors', text: 'Browse verified specialists across various medical fields.', color: '#0d9488' },
                        { icon: <FaCalendarCheck size={28} />, title: 'Instant Booking', text: 'Schedule appointments anytime, anywhere with ease.', color: '#059669' },
                        { icon: <FaClock size={28} />, title: 'Real-time Status', text: 'Track your appointments and get live updates.', color: '#0891b2' },
                        { icon: <FaShieldAlt size={28} />, title: 'Role-Based Access', text: 'Custom dashboards for patients, doctors, and admins.', color: '#7c3aed' }
                    ].map((feature, index) => (
                        <div key={index} className="col-md-3 col-sm-6">
                            <div className="glass-card p-4 text-center h-100" style={{ cursor: 'default' }}>
                                <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                                    style={{
                                        width: '56px', height: '56px',
                                        background: `${feature.color}15`,
                                        color: feature.color
                                    }}>
                                    {feature.icon}
                                </div>
                                <h5 className="fw-bold mb-2" style={{ fontSize: '1rem' }}>{feature.title}</h5>
                                <p style={{ color: 'var(--txt-secondary)', fontSize: '0.85rem', marginBottom: 0 }}>{feature.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section — Teal gradient */}
                <div className="p-5 text-center text-white" style={{
                    background: 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(13, 148, 136, 0.25)'
                }}>
                    <h2 className="fw-bold mb-3" style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}>
                        Ready to get started?
                    </h2>
                    <p className="mb-4" style={{ color: '#94a3b8', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
                        Join thousands of patients taking control of their healthcare journey.
                    </p>
                    <Link to="/register" className="btn px-5 py-3 fw-bold" style={{
                        background: '#ffffff',
                        color: '#0f766e',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
                    }}>
                        Register Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
