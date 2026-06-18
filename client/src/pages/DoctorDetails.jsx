import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaGraduationCap, FaHistory, FaHospital, FaCalendarCheck, FaStethoscope } from 'react-icons/fa';

const DoctorDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [bookingData, setBookingData] = useState({
        appointmentDate: '',
        appointmentTime: '',
        reason: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const { data } = await axios.get(`/api/doctors/${id}`);
                setDoctor(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDoctor();
    }, [id]);

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('/api/appointments', { doctorId: id, ...bookingData }, config);
            setMessage({ type: 'success', text: 'Appointment booked successfully!' });
            setTimeout(() => navigate('/patient/dashboard'), 2000);
        } catch (err) {
            setMessage({ type: 'danger', text: err.response?.data?.message || 'Booking failed' });
        }
    };

    if (!doctor) return <div className="container py-5 text-center"><div className="spinner-border" style={{ color: 'var(--teal-500)' }}></div></div>;

    return (
        <div className="container py-5 animate-fade-in">
            <div className="row g-5">
                {/* Doctor Bio */}
                <div className="col-lg-7">
                    <div className="glass-card p-4 p-md-5">
                        <div className="d-flex flex-column flex-md-row align-items-md-start mb-4 gap-4">
                            <div className="rounded-4 overflow-hidden" style={{ width: '150px', height: '150px', border: '3px solid var(--teal-50)', flexShrink: 0 }}>
                                <img src={`/uploads/${doctor.userId.profileImage}`} className="w-100 h-100 object-fit-cover doctor-avatar loaded" onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/150'; }} />
                            </div>
                            <div>
                                <h1 className="fw-bold mb-1" style={{ color: 'var(--txt-primary)' }}>{doctor.userId.name}</h1>
                                <p className="fs-5 fw-semibold mb-3 d-flex align-items-center" style={{ color: 'var(--teal-600)' }}><FaStethoscope className="me-2" /> {doctor.specialization}</p>
                                <div className="d-inline-flex align-items-center p-2 rounded-3" style={{ background: 'var(--bg-subtle)', color: 'var(--txt-secondary)' }}>
                                    <FaHospital className="me-2" /> <span style={{ fontSize: '0.9rem' }}>{doctor.hospital}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row g-3 mb-5">
                            <div className="col-sm-4">
                                <div className="p-3 rounded-4 border text-center h-100" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                                    <div className="d-inline-flex p-2 rounded-circle mb-2" style={{ background: 'var(--teal-50)', color: 'var(--teal-600)' }}>
                                        <FaHistory size={20} />
                                    </div>
                                    <h6 className="mb-1" style={{ color: 'var(--txt-secondary)', fontSize: '0.85rem' }}>Experience</h6>
                                    <p className="fw-bold mb-0" style={{ color: 'var(--txt-primary)' }}>{doctor.experience}+ Years</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="p-3 rounded-4 border text-center h-100" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                                    <div className="d-inline-flex p-2 rounded-circle mb-2" style={{ background: 'var(--teal-50)', color: 'var(--teal-600)' }}>
                                        <FaGraduationCap size={20} />
                                    </div>
                                    <h6 className="mb-1" style={{ color: 'var(--txt-secondary)', fontSize: '0.85rem' }}>Qualification</h6>
                                    <p className="fw-bold mb-0" style={{ color: 'var(--txt-primary)', fontSize: '0.9rem' }}>{doctor.qualification}</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="p-3 rounded-4 border text-center h-100" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                                    <div className="d-inline-flex p-2 rounded-circle mb-2" style={{ background: 'var(--teal-50)', color: 'var(--teal-600)' }}>
                                        <FaCalendarCheck size={20} />
                                    </div>
                                    <h6 className="mb-1" style={{ color: 'var(--txt-secondary)', fontSize: '0.85rem' }}>Consultation Fee</h6>
                                    <p className="fw-bold mb-0" style={{ color: 'var(--emerald-600)' }}>${doctor.consultationFee}</p>
                                </div>
                            </div>
                        </div>

                        <h4 className="fw-bold mb-3" style={{ color: 'var(--txt-primary)' }}>About Doctor</h4>
                        <div className="p-4 rounded-4" style={{ background: 'var(--bg-subtle)' }}>
                            <p className="mb-0" style={{ color: 'var(--txt-secondary)', lineHeight: 1.7 }}>{doctor.bio || 'No bio available for this doctor.'}</p>
                        </div>
                    </div>
                </div>

                {/* Booking Form */}
                <div className="col-lg-5">
                    <div className="glass-card p-4 p-md-5 sticky-top" style={{ top: '100px', borderTop: '4px solid var(--teal-500)' }}>
                        <h3 className="fw-bold mb-4" style={{ color: 'var(--txt-primary)' }}>Book Appointment</h3>
                        {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}
                        <form onSubmit={handleBooking}>
                            <div className="mb-3">
                                <label className="form-label">Select Date</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    required 
                                    value={bookingData.appointmentDate}
                                    onChange={(e) => setBookingData({...bookingData, appointmentDate: e.target.value})}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Select Time Slot</label>
                                <select 
                                    className="form-select" 
                                    required
                                    value={bookingData.appointmentTime}
                                    onChange={(e) => setBookingData({...bookingData, appointmentTime: e.target.value})}
                                >
                                    <option value="">Choose Time...</option>
                                    <option value="10:00 AM">10:00 AM</option>
                                    <option value="11:00 AM">11:00 AM</option>
                                    <option value="02:00 PM">02:00 PM</option>
                                    <option value="03:00 PM">03:00 PM</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="form-label">Reason for Visit</label>
                                <textarea 
                                    className="form-control" 
                                    rows="3" 
                                    placeholder="Briefly describe your symptoms"
                                    value={bookingData.reason}
                                    onChange={(e) => setBookingData({...bookingData, reason: e.target.value})}
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-premium w-100 py-3 fw-bold" style={{ fontSize: '1rem' }}>Confirm Booking</button>
                            <p className="text-center mt-3 text-muted small">You will receive a notification once confirmed.</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetails;
