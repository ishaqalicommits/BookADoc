import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch, FaStethoscope, FaHospital, FaClock } from 'react-icons/fa';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDoctors();
    }, [specialization]);

    const fetchDoctors = async () => {
        try {
            const { data } = await axios.get(`/api/doctors?specialization=${specialization}&search=${search}`);
            setDoctors(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container py-5 animate-fade-in">
            <div className="text-center mb-5">
                <h2 className="mb-3 fw-bold" style={{ color: 'var(--txt-primary)' }}>Find Your Specialist</h2>
                <p style={{ color: 'var(--txt-secondary)', maxWidth: '500px', margin: '0 auto' }}>Search and book appointments with the best healthcare professionals.</p>
            </div>
            
            {/* Search & Filter */}
            <div className="row g-3 mb-5 justify-content-center">
                <div className="col-md-5">
                    <div className="input-group glass-card overflow-hidden h-100" style={{ padding: '4px' }}>
                        <span className="input-group-text bg-transparent border-0"><FaSearch style={{ color: 'var(--txt-muted)' }} /></span>
                        <input 
                            type="text" 
                            className="form-control border-0 bg-transparent py-2 shadow-none" 
                            placeholder="Search by name or specialization..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && fetchDoctors()}
                            style={{ color: 'var(--txt-primary)' }}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <select 
                        className="form-select glass-card h-100 py-2 shadow-none border-0" 
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        style={{ color: 'var(--txt-primary)' }}
                    >
                        <option value="">All Specializations</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Psychiatry">Psychiatry</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-premium w-100 h-100 py-2" onClick={fetchDoctors}>Search</button>
                </div>
            </div>

            {/* Doctors Grid */}
            <div className="row g-4">
                {loading ? (
                    <div className="col-12 text-center py-5">
                        <div className="spinner-border" style={{ color: 'var(--teal-500)' }} role="status"></div>
                    </div>
                ) : doctors.length > 0 ? (
                    doctors.map(doctor => (
                        <div key={doctor._id} className="col-md-6 col-lg-4 col-xl-3">
                            <div className="glass-card h-100 overflow-hidden d-flex flex-column">
                                <div className="p-4 flex-grow-1">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="rounded-circle overflow-hidden me-3" style={{ width: '64px', height: '64px', border: '2px solid var(--teal-100)' }}>
                                            <img src={doctor.userId.profileImage && doctor.userId.profileImage !== 'default-profile.png' ? `/uploads/${doctor.userId.profileImage}` : 'https://via.placeholder.com/64'} alt={doctor.userId.name} className="w-100 h-100 object-fit-cover doctor-avatar loaded" onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/64'; }} />
                                        </div>
                                        <div>
                                            <h5 className="mb-0 fw-bold" style={{ fontSize: '1.1rem' }}>{doctor.userId.name}</h5>
                                            <span style={{ color: 'var(--teal-600)', fontSize: '0.85rem', fontWeight: 600 }}>{doctor.specialization}</span>
                                        </div>
                                    </div>
                                    <div className="mb-3" style={{ background: 'var(--bg-subtle)', borderRadius: '8px', padding: '12px' }}>
                                        <p className="small mb-2 d-flex align-items-center" style={{ color: 'var(--txt-secondary)' }}><FaHospital className="me-2 text-muted" /> <span className="text-truncate">{doctor.hospital}</span></p>
                                        <p className="small mb-0 d-flex align-items-center" style={{ color: 'var(--txt-secondary)' }}><FaClock className="me-2 text-muted" /> {doctor.availableTime}</p>
                                    </div>
                                </div>
                                <div className="p-4 pt-0 mt-auto">
                                    <div className="d-flex justify-content-between align-items-center border-top pt-3" style={{ borderColor: 'var(--border)' }}>
                                        <div>
                                            <span className="small text-muted d-block" style={{ fontSize: '0.75rem' }}>Consultation Fee</span>
                                            <span className="fw-bold" style={{ color: 'var(--emerald-600)' }}>${doctor.consultationFee}</span>
                                        </div>
                                        <Link to={`/doctors/${doctor._id}`} className="btn btn-sm px-3 py-2" style={{ 
                                            background: 'var(--teal-50)', 
                                            color: 'var(--teal-700)', 
                                            border: '1px solid var(--teal-200)',
                                            borderRadius: '8px',
                                            fontWeight: 600
                                        }}>Book Appt</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center py-5">
                        <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: '80px', height: '80px', background: 'var(--bg-subtle)', color: 'var(--txt-muted)' }}>
                            <FaStethoscope size={40} />
                        </div>
                        <h4 className="fw-bold" style={{ color: 'var(--txt-primary)' }}>No doctors found</h4>
                        <p className="text-muted">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Doctors;
