import { Link } from 'react-router-dom';
import { FaUserMd, FaCalendarCheck, FaShieldAlt, FaHeartbeat, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const About = () => {
    const team = [
        { name: 'Dr. Sarah Johnson', role: 'Chief Medical Officer', specialty: 'Cardiology', color: '#0d9488' },
        { name: 'Dr. Ahmed Khan', role: 'Head of Surgery', specialty: 'Neurosurgery', color: '#14b8a6' },
        { name: 'Dr. Priya Sharma', role: 'Medical Director', specialty: 'Pediatrics', color: '#059669' },
    ];

    const stats = [
        { number: '500+', label: 'Verified Doctors' },
        { number: '10,000+', label: 'Happy Patients' },
        { number: '50+', label: 'Specializations' },
        { number: '24/7', label: 'Support Available' },
    ];

    return (
        <div className="container py-5 animate-fade-in">

            {/* Hero Section */}
            <div className="p-5 mb-5 text-center" style={{ background: 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)', borderRadius: '16px', boxShadow: '0 8px 32px rgba(13, 148, 136, 0.2)' }}>
                <FaHeartbeat size={60} className="mb-3" style={{ color: '#5eead4' }} />
                <h1 className="display-4 fw-bold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>About BookADoc</h1>
                <p className="lead text-white mb-4" style={{ opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>
                    We are on a mission to make healthcare simple, accessible, and efficient for everyone.
                    Connecting patients with the right doctors — at the right time.
                </p>
                <Link to="/doctors" className="btn px-5 py-2 fw-bold shadow-sm" style={{ background: '#ffffff', color: '#0f766e', borderRadius: '10px' }}>
                    Find a Doctor
                </Link>
            </div>

            {/* Mission Section */}
            <div className="row g-4 mb-5 align-items-center mt-4">
                <div className="col-lg-6">
                    <h2 className="fw-bold mb-3" style={{ color: 'var(--txt-primary)' }}>Our Mission</h2>
                    <p style={{ color: 'var(--txt-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                        At BookADoc, we believe that access to quality healthcare is a fundamental right. 
                        Our platform bridges the gap between patients and healthcare professionals by providing 
                        a seamless, secure, and reliable appointment booking experience.
                    </p>
                    <p style={{ color: 'var(--txt-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                        From verified specialists to instant booking, we empower patients to take control 
                        of their healthcare journey while helping doctors manage their practice efficiently.
                    </p>
                    <div className="d-flex gap-4 flex-wrap">
                        <div className="d-flex align-items-center gap-2 fw-semibold" style={{ color: 'var(--teal-600)' }}>
                            <div className="p-2 rounded-circle" style={{ background: 'var(--teal-50)' }}><FaShieldAlt /></div> Verified Doctors
                        </div>
                        <div className="d-flex align-items-center gap-2 fw-semibold" style={{ color: 'var(--teal-600)' }}>
                            <div className="p-2 rounded-circle" style={{ background: 'var(--teal-50)' }}><FaCalendarCheck /></div> Instant Booking
                        </div>
                        <div className="d-flex align-items-center gap-2 fw-semibold" style={{ color: 'var(--teal-600)' }}>
                            <div className="p-2 rounded-circle" style={{ background: 'var(--teal-50)' }}><FaUserMd /></div> Role-Based Access
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 text-center text-lg-end mt-5 mt-lg-0">
                    <div className="p-2 rounded-4 d-inline-block" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                        <img
                            src="https://img.freepik.com/free-vector/doctors-concept-illustration_114360-1515.jpg"
                            alt="Healthcare Team"
                            className="img-fluid rounded-3"
                            style={{ maxWidth: '90%' }}
                        />
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="row g-4 mb-5 mt-3">
                {stats.map((stat, index) => (
                    <div key={index} className="col-6 col-md-3">
                        <div className="glass-card p-4 text-center h-100">
                            <h2 className="fw-bold mb-1" style={{ color: 'var(--teal-600)', fontSize: '2.5rem' }}>{stat.number}</h2>
                            <p style={{ color: 'var(--txt-secondary)', margin: 0, fontWeight: 500, fontSize: '0.9rem' }}>{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Team Section */}
            <div className="mb-5 py-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bold mb-2" style={{ color: 'var(--txt-primary)' }}>Meet Our Leadership</h2>
                    <p style={{ color: 'var(--txt-secondary)' }}>The experts dedicated to your healthcare experience.</p>
                </div>
                <div className="row g-4 justify-content-center">
                    {team.map((member, index) => (
                        <div key={index} className="col-md-4">
                            <div className="glass-card p-4 text-center h-100">
                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                                    style={{ width: 80, height: 80, background: `linear-gradient(135deg, ${member.color}, #5eead4)` }}
                                >
                                    <FaUserMd size={36} color="white" />
                                </div>
                                <h5 className="fw-bold mb-1" style={{ color: 'var(--txt-primary)' }}>{member.name}</h5>
                                <p style={{ color: 'var(--teal-600)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem' }}>{member.role}</p>
                                <span className="badge" style={{ background: 'var(--bg-subtle)', color: 'var(--txt-secondary)', border: '1px solid var(--border)' }}>{member.specialty}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Section */}
            <div className="glass-card p-5 mb-4 text-center" style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '300px', height: '300px', background: 'var(--teal-50)', borderRadius: '50%', filter: 'blur(60px)', zIndex: 0, opacity: 0.6 }}></div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 className="fw-bold mb-2" style={{ color: 'var(--txt-primary)' }}>Get In Touch</h2>
                    <p style={{ color: 'var(--txt-secondary)', marginBottom: '3rem' }}>Have questions? We're here to help.</p>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="p-4 rounded-4" style={{ background: 'var(--bg-page)', border: '1px solid var(--border)', height: '100%' }}>
                                <div className="d-inline-flex p-3 rounded-circle mb-3" style={{ background: 'var(--teal-50)', color: 'var(--teal-600)' }}>
                                    <FaEnvelope size={24} />
                                </div>
                                <h6 className="fw-bold" style={{ color: 'var(--txt-primary)' }}>Email Us</h6>
                                <p style={{ color: 'var(--txt-secondary)', fontSize: '0.85rem', margin: 0 }}>support@bookadoc.com</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4 rounded-4" style={{ background: 'var(--bg-page)', border: '1px solid var(--border)', height: '100%' }}>
                                <div className="d-inline-flex p-3 rounded-circle mb-3" style={{ background: 'var(--teal-50)', color: 'var(--teal-600)' }}>
                                    <FaPhone size={24} />
                                </div>
                                <h6 className="fw-bold" style={{ color: 'var(--txt-primary)' }}>Call Us</h6>
                                <p style={{ color: 'var(--txt-secondary)', fontSize: '0.85rem', margin: 0 }}>+1 (800) 123-4567</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4 rounded-4" style={{ background: 'var(--bg-page)', border: '1px solid var(--border)', height: '100%' }}>
                                <div className="d-inline-flex p-3 rounded-circle mb-3" style={{ background: 'var(--teal-50)', color: 'var(--teal-600)' }}>
                                    <FaMapMarkerAlt size={24} />
                                </div>
                                <h6 className="fw-bold" style={{ color: 'var(--txt-primary)' }}>Visit Us</h6>
                                <p style={{ color: 'var(--txt-secondary)', fontSize: '0.85rem', margin: 0 }}>123 Health Street, Med City</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <Link to="/register" className="btn btn-premium px-5 py-3 rounded-pill" style={{ fontSize: '1rem' }}>Join BookADoc Today</Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;
