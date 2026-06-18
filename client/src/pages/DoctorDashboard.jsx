import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaUsers, FaCalendarCheck, FaStethoscope, FaSyncAlt } from 'react-icons/fa';

const DoctorDashboard = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
        const interval = setInterval(fetchAppointments, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('/api/appointments', config);
            setAppointments(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`/api/appointments/${id}`, { status }, config);
            fetchAppointments();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container py-5 animate-fade-in">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
                <div className="d-flex align-items-center">
                    <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3" 
                         style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, var(--teal-600), var(--teal-500))', fontSize: '1.5rem' }}>
                        <FaStethoscope />
                    </div>
                    <div>
                        <h2 className="mb-1 fw-bold" style={{ color: 'var(--txt-primary)' }}>Doctor's Console</h2>
                        <p style={{ color: 'var(--txt-secondary)', margin: 0 }}>Manage your schedule and patients</p>
                    </div>
                </div>
                <button 
                    className="btn px-4 py-2 fw-semibold d-flex align-items-center gap-2 rounded-pill" 
                    onClick={fetchAppointments} 
                    disabled={loading}
                    style={{ background: 'var(--bg-subtle)', color: 'var(--txt-primary)', border: '1px solid var(--border)' }}
                >
                    <FaSyncAlt className={loading ? "animate-spin" : ""} /> Refresh
                </button>
            </div>
            
            <div className="row g-4 mb-5">
                <div className="col-md-4">
                    <div className="stat-card p-4 border-bottom border-primary border-4 h-100">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 style={{ color: 'var(--txt-secondary)', margin: 0, fontWeight: 600 }}>Total Patients</h6>
                            <div className="d-inline-flex p-2 rounded-circle" style={{ background: 'var(--slate-100)', color: 'var(--slate-600)' }}>
                                <FaUsers size={20} />
                            </div>
                        </div>
                        <h3 className="fw-bold m-0" style={{ color: 'var(--txt-primary)', fontSize: '2rem' }}>
                            {appointments.length}
                        </h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="stat-card p-4 border-bottom border-success border-4 h-100">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 style={{ color: 'var(--txt-secondary)', margin: 0, fontWeight: 600 }}>Confirmed Appointments</h6>
                            <div className="d-inline-flex p-2 rounded-circle" style={{ background: 'var(--emerald-100)', color: 'var(--emerald-600)' }}>
                                <FaCalendarCheck size={20} />
                            </div>
                        </div>
                        <h3 className="fw-bold m-0" style={{ color: 'var(--txt-primary)', fontSize: '2rem' }}>
                            {appointments.filter(a => a.status === 'Confirmed').length}
                        </h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="stat-card p-4 border-bottom border-warning border-4 h-100">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 style={{ color: 'var(--txt-secondary)', margin: 0, fontWeight: 600 }}>Pending Requests</h6>
                            <div className="d-inline-flex p-2 rounded-circle" style={{ background: 'var(--amber-100)', color: 'var(--amber-700)' }}>
                                <FaStethoscope size={20} />
                            </div>
                        </div>
                        <h3 className="fw-bold m-0" style={{ color: 'var(--txt-primary)', fontSize: '2rem' }}>
                            {appointments.filter(a => a.status === 'Pending').length}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="glass-card p-4 p-md-5">
                <h4 className="fw-bold mb-4" style={{ color: 'var(--txt-primary)' }}>Patient Appointments</h4>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0" style={{ color: 'var(--txt-primary)' }}>
                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Date & Time</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && appointments.length === 0 ? (
                                <tr><td colSpan="5" className="text-center py-5"><div className="spinner-border text-primary"></div></td></tr>
                            ) : appointments.length > 0 ? (
                                appointments.map(app => (
                                    <tr key={app._id}>
                                        <td className="py-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                                                    style={{ width: 40, height: 40, background: 'var(--slate-400)', fontSize: 14 }}>
                                                    {app.patientId?.name?.charAt(0) || 'P'}
                                                </div>
                                                <div className="fw-semibold" style={{ color: 'var(--txt-primary)' }}>{app.patientId?.name || 'Unknown'}</div>
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
                                            <span className={`badge ${
                                                app.status === 'Confirmed' ? 'badge-approved' : 
                                                app.status === 'Pending' ? 'badge-pending' : 
                                                'badge-cancelled'
                                            }`}>{app.status}</span>
                                        </td>
                                        <td className="text-end">
                                            {app.status === 'Pending' ? (
                                                <div className="d-flex justify-content-end gap-2">
                                                    <button className="btn btn-sm btn-success rounded-pill px-3" onClick={() => updateStatus(app._id, 'Confirmed')}>Approve</button>
                                                    <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={() => updateStatus(app._id, 'Cancelled')}>Reject</button>
                                                </div>
                                            ) : (
                                                <span className="text-muted small">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="5" className="text-center text-muted py-5">
                                    <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: '64px', height: '64px', background: 'var(--bg-subtle)', color: 'var(--txt-muted)' }}>
                                        <FaCalendarCheck size={24} />
                                    </div>
                                    <h6 className="fw-bold" style={{ color: 'var(--txt-primary)' }}>No appointments yet</h6>
                                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>You don't have any patient bookings at this time.</p>
                                </td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
