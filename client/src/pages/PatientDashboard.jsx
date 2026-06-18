import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaCalendarAlt, FaHistory, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const PatientDashboard = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(null);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('/api/appointments', config);
            setAppointments(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const cancelAppointment = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
        try {
            setCancelling(id);
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`/api/appointments/${id}`, { status: 'Cancelled' }, config);
            await fetchAppointments();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to cancel appointment.');
        } finally {
            setCancelling(null);
        }
    };

    return (
        <div className="container py-5 animate-fade-in">
            <div className="d-flex align-items-center mb-5">
                <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3" 
                     style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, var(--teal-600), var(--teal-500))', fontSize: '1.5rem' }}>
                    {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h2 className="mb-1 fw-bold" style={{ color: 'var(--txt-primary)' }}>Welcome back, <span style={{ color: 'var(--teal-600)' }}>{user.name}</span></h2>
                    <p style={{ color: 'var(--txt-secondary)', margin: 0 }}>Manage your appointments and medical history</p>
                </div>
            </div>
            
            <div className="row g-4 mb-5">
                <div className="col-md-4">
                    <div className="stat-card p-4 border-bottom border-warning border-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 style={{ color: 'var(--txt-secondary)', margin: 0, fontWeight: 600 }}>Pending Bookings</h6>
                            <div className="d-inline-flex p-2 rounded-circle" style={{ background: 'var(--amber-100)', color: 'var(--amber-700)' }}>
                                <FaClock size={20} />
                            </div>
                        </div>
                        <h3 className="fw-bold m-0" style={{ color: 'var(--txt-primary)', fontSize: '2rem' }}>
                            {appointments.filter(a => a.status === 'Pending').length}
                        </h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="stat-card p-4 border-bottom border-success border-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 style={{ color: 'var(--txt-secondary)', margin: 0, fontWeight: 600 }}>Confirmed Consultations</h6>
                            <div className="d-inline-flex p-2 rounded-circle" style={{ background: 'var(--emerald-100)', color: 'var(--emerald-600)' }}>
                                <FaCheckCircle size={20} />
                            </div>
                        </div>
                        <h3 className="fw-bold m-0" style={{ color: 'var(--txt-primary)', fontSize: '2rem' }}>
                            {appointments.filter(a => a.status === 'Confirmed').length}
                        </h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="stat-card p-4 border-bottom border-danger border-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 style={{ color: 'var(--txt-secondary)', margin: 0, fontWeight: 600 }}>Cancelled Sessions</h6>
                            <div className="d-inline-flex p-2 rounded-circle" style={{ background: 'var(--rose-100)', color: 'var(--rose-600)' }}>
                                <FaTimesCircle size={20} />
                            </div>
                        </div>
                        <h3 className="fw-bold m-0" style={{ color: 'var(--txt-primary)', fontSize: '2rem' }}>
                            {appointments.filter(a => a.status === 'Cancelled').length}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="glass-card p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold m-0 d-flex align-items-center" style={{ color: 'var(--txt-primary)' }}>
                        <FaHistory className="me-2 text-muted" /> My Appointments
                    </h4>
                </div>
                
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0" style={{ color: 'var(--txt-primary)' }}>
                        <thead>
                            <tr>
                                <th>Doctor</th>
                                <th>Date & Time</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" className="text-center py-5">
                                    <div className="spinner-border" style={{ color: 'var(--teal-500)' }} role="status"></div>
                                </td></tr>
                            ) : appointments.length > 0 ? (
                                appointments.map(app => (
                                    <tr key={app._id}>
                                        <td className="py-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                                                    style={{ width: 40, height: 40, background: 'var(--teal-600)', fontSize: 14 }}>
                                                    {app.doctorId?.userId?.name?.charAt(0) || 'D'}
                                                </div>
                                                <div>
                                                    <div className="fw-semibold" style={{ color: 'var(--txt-primary)' }}>{app.doctorId?.userId?.name || 'Unknown Doctor'}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--txt-muted)' }}>{app.doctorId?.specialization || 'General'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 500 }}>{new Date(app.appointmentDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--txt-secondary)' }}>{app.appointmentTime}</div>
                                        </td>
                                        <td>
                                            <span className="text-truncate d-inline-block" style={{ maxWidth: '200px', fontSize: '0.9rem', color: 'var(--txt-secondary)' }}>{app.reason || '—'}</span>
                                        </td>
                                        <td>
                                            <span className={`badge badge-${app.status.toLowerCase()}`}>{app.status}</span>
                                        </td>
                                        <td className="text-end">
                                            {(app.status === 'Pending' || app.status === 'Confirmed') ? (
                                                <button
                                                    className="btn btn-sm btn-outline-danger px-3 rounded-pill"
                                                    onClick={() => cancelAppointment(app._id)}
                                                    disabled={cancelling === app._id}
                                                    style={{ fontSize: '0.8rem', fontWeight: 500 }}
                                                >
                                                    {cancelling === app._id ? (
                                                        <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                                                    ) : '✕ '}
                                                    Cancel
                                                </button>
                                            ) : (
                                                <span className="text-muted" style={{ fontSize: '0.85rem' }}>—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="5" className="text-center py-5">
                                    <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: '64px', height: '64px', background: 'var(--bg-subtle)', color: 'var(--txt-muted)' }}>
                                        <FaCalendarAlt size={24} />
                                    </div>
                                    <h6 className="fw-bold" style={{ color: 'var(--txt-primary)' }}>No appointments found</h6>
                                    <p className="text-muted" style={{ fontSize: '0.9rem' }}>You haven't booked any appointments yet.</p>
                                    <a href="/doctors" className="btn btn-sm btn-premium px-4 mt-2">Book Now</a>
                                </td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
