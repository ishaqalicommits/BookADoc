import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaUserShield, FaUserMd, FaUsers, FaChartBar, FaTrash, FaUserPlus, FaCalendarAlt } from 'react-icons/fa';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [doctors, setDoctors] = useState([]);
    const [users, setUsers] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('doctors'); // 'doctors', 'users', or 'analytics'
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Patient',
        phone: '',
        gender: 'Male'
    });
    const [newDoctor, setNewDoctor] = useState({
        name: '', email: '', password: '', phone: '', gender: 'Male',
        specialization: '', qualification: '', experience: '', hospital: '', consultationFee: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        await Promise.all([fetchDoctors(), fetchUsers(), fetchAnalytics()]);
        setLoading(false);
    };

    const fetchAnalytics = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('/api/admin/analytics', config);
            setAnalytics(data);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        }
    };

    const fetchDoctors = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('/api/doctors?all=true', config); 
            setDoctors(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchUsers = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('/api/users', config); 
            setUsers(data);
        } catch (error) {
            console.error(error);
        }
    };

    const updateDoctorStatus = async (id, status) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`/api/doctors/${id}/status`, { status }, config);
            fetchDoctors();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('/api/users', newUser, config);
            alert('User login credentials created and stored successfully!');
            setNewUser({
                name: '',
                email: '',
                password: '',
                role: 'Patient',
                phone: '',
                gender: 'Male'
            });
            await fetchUsers();
            await fetchDoctors(); // Refresh in case we added a Doctor
        } catch (error) {
            alert(error.response?.data?.message || 'Error creating user login details');
        }
    };

    const handleAddDoctor = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            // 1. Create User
            const userRes = await axios.post('/api/users', {
                name: newDoctor.name, email: newDoctor.email, password: newDoctor.password,
                phone: newDoctor.phone, gender: newDoctor.gender, role: 'Doctor'
            }, config);
            
            // 2. Create Doctor Profile
            await axios.post('/api/admin/doctors', {
                userId: userRes.data._id,
                specialization: newDoctor.specialization,
                qualification: newDoctor.qualification,
                experience: newDoctor.experience,
                hospital: newDoctor.hospital,
                consultationFee: newDoctor.consultationFee,
                bio: `Expert ${newDoctor.specialization} with ${newDoctor.experience} years of experience.`
            }, config);
            
            alert('Doctor added successfully!');
            setNewDoctor({
                name: '', email: '', password: '', phone: '', gender: 'Male',
                specialization: '', qualification: '', experience: '', hospital: '', consultationFee: ''
            });
            await fetchUsers();
            await fetchDoctors();
            setActiveTab('doctors');
        } catch (error) {
            alert(error.response?.data?.message || 'Error adding doctor');
        }
    };

    const handleDeleteUser = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete the login details and account of ${name}?`)) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`/api/users/${id}`, config);
                alert('User login details deleted successfully.');
                await fetchUsers();
                await fetchDoctors(); // Refresh in case the deleted user was a Doctor
            } catch (error) {
                alert(error.response?.data?.message || 'Error deleting user login details');
            }
        }
    };

    return (
        <div className="container py-5 animate-fade-in">
            <div className="d-flex align-items-center mb-5">
                <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3" 
                     style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, var(--teal-600), var(--teal-500))', fontSize: '1.5rem' }}>
                    <FaUserShield />
                </div>
                <div>
                    <h2 className="mb-1 fw-bold" style={{ color: 'var(--txt-primary)' }}>Admin Control Panel</h2>
                    <p style={{ color: 'var(--txt-secondary)', margin: 0 }}>System administration and management dashboard</p>
                </div>
            </div>
            
            <div className="row g-4 mb-5">
                <div className="col-md-3">
                    <div className="stat-card p-4 border-bottom border-primary border-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 style={{ color: 'var(--txt-secondary)', margin: 0, fontWeight: 600 }}>Registered Doctors</h6>
                            <div className="d-inline-flex p-2 rounded-circle" style={{ background: 'var(--slate-100)', color: 'var(--slate-600)' }}>
                                <FaUserMd size={20} />
                            </div>
                        </div>
                        <h3 className="fw-bold m-0" style={{ color: 'var(--txt-primary)', fontSize: '2rem' }}>
                            {doctors.length}
                        </h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-card p-4 border-bottom border-success border-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 style={{ color: 'var(--txt-secondary)', margin: 0, fontWeight: 600 }}>Total Patients</h6>
                            <div className="d-inline-flex p-2 rounded-circle" style={{ background: 'var(--emerald-100)', color: 'var(--emerald-600)' }}>
                                <FaUsers size={20} />
                            </div>
                        </div>
                        <h3 className="fw-bold m-0" style={{ color: 'var(--txt-primary)', fontSize: '2rem' }}>
                            {users.filter(u => u.role === 'Patient').length}
                        </h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-card p-4 border-bottom border-warning border-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 style={{ color: 'var(--txt-secondary)', margin: 0, fontWeight: 600 }}>Pending Approvals</h6>
                            <div className="d-inline-flex p-2 rounded-circle" style={{ background: 'var(--amber-100)', color: 'var(--amber-700)' }}>
                                <FaChartBar size={20} />
                            </div>
                        </div>
                        <h3 className="fw-bold m-0" style={{ color: 'var(--txt-primary)', fontSize: '2rem' }}>
                            {doctors.filter(d => d.approvalStatus === 'Pending').length}
                        </h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-card p-4 border-bottom border-danger border-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 style={{ color: 'var(--txt-secondary)', margin: 0, fontWeight: 600 }}>Admin Roles</h6>
                            <div className="d-inline-flex p-2 rounded-circle" style={{ background: 'var(--rose-100)', color: 'var(--rose-600)' }}>
                                <FaUserShield size={20} />
                            </div>
                        </div>
                        <h3 className="fw-bold m-0" style={{ color: 'var(--txt-primary)', fontSize: '2rem' }}>
                            {users.filter(u => u.role === 'Admin').length}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mb-4 d-flex flex-wrap gap-2">
                <button 
                    className={`btn px-4 py-2 fw-semibold rounded-pill ${activeTab === 'doctors' ? 'btn-premium' : ''}`} 
                    onClick={() => setActiveTab('doctors')}
                    style={activeTab !== 'doctors' ? { background: 'var(--bg-subtle)', color: 'var(--txt-secondary)', border: '1px solid var(--border)' } : {}}
                >
                    Doctor Verification Queue
                </button>
                <button 
                    className={`btn px-4 py-2 fw-semibold rounded-pill ${activeTab === 'users' ? 'btn-premium' : ''}`} 
                    onClick={() => setActiveTab('users')}
                    style={activeTab !== 'users' ? { background: 'var(--bg-subtle)', color: 'var(--txt-secondary)', border: '1px solid var(--border)' } : {}}
                >
                    Manage User Accounts
                </button>
                <button 
                    className={`btn px-4 py-2 fw-semibold rounded-pill ${activeTab === 'analytics' ? 'btn-premium' : ''}`} 
                    onClick={() => setActiveTab('analytics')}
                    style={activeTab !== 'analytics' ? { background: 'var(--bg-subtle)', color: 'var(--txt-secondary)', border: '1px solid var(--border)' } : {}}
                >
                    Appointment Analytics
                </button>
                <button 
                    className={`btn px-4 py-2 fw-semibold rounded-pill ${activeTab === 'add_doctor' ? 'btn-premium' : ''}`} 
                    onClick={() => setActiveTab('add_doctor')}
                    style={activeTab !== 'add_doctor' ? { background: 'var(--bg-subtle)', color: 'var(--txt-secondary)', border: '1px solid var(--border)' } : {}}
                >
                    Add Doctor
                </button>
            </div>

            {activeTab === 'add_doctor' && (
                <div className="glass-card p-4 p-md-5 animate-fade-in">
                    <h4 className="fw-bold mb-4 d-flex align-items-center gap-2" style={{ color: 'var(--txt-primary)' }}>
                        <div className="d-inline-flex p-2 rounded-circle" style={{ background: 'var(--teal-50)', color: 'var(--teal-600)' }}>
                            <FaUserMd size={20} />
                        </div>
                        Add New Doctor Profile
                    </h4>
                    <p style={{ color: 'var(--txt-secondary)', marginBottom: '2rem' }}>Please verify the doctor's qualifications before adding them to the system. They will be automatically approved.</p>
                    <form onSubmit={handleAddDoctor}>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <h6 className="fw-bold" style={{ color: 'var(--teal-600)' }}>Login Details</h6>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'var(--txt-secondary)' }}>Full Name</label>
                                    <input type="text" className="form-control" required value={newDoctor.name} onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'var(--txt-secondary)' }}>Email</label>
                                    <input type="email" className="form-control" required value={newDoctor.email} onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'var(--txt-secondary)' }}>Password</label>
                                    <input type="password" className="form-control" required value={newDoctor.password} onChange={(e) => setNewDoctor({...newDoctor, password: e.target.value})} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'var(--txt-secondary)' }}>Phone</label>
                                    <input type="text" className="form-control" value={newDoctor.phone} onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'var(--txt-secondary)' }}>Gender</label>
                                    <select className="form-select" value={newDoctor.gender} onChange={(e) => setNewDoctor({...newDoctor, gender: e.target.value})}>
                                        <option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h6 className="fw-bold" style={{ color: 'var(--teal-600)' }}>Professional Details</h6>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'var(--txt-secondary)' }}>Specialization</label>
                                    <input type="text" className="form-control" required placeholder="e.g. Cardiologist" value={newDoctor.specialization} onChange={(e) => setNewDoctor({...newDoctor, specialization: e.target.value})} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'var(--txt-secondary)' }}>Qualification (Verified)</label>
                                    <input type="text" className="form-control" required placeholder="e.g. MBBS, MD" value={newDoctor.qualification} onChange={(e) => setNewDoctor({...newDoctor, qualification: e.target.value})} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'var(--txt-secondary)' }}>Experience (Years)</label>
                                    <input type="number" className="form-control" required placeholder="e.g. 10" value={newDoctor.experience} onChange={(e) => setNewDoctor({...newDoctor, experience: e.target.value})} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'var(--txt-secondary)' }}>Hospital/Clinic Name</label>
                                    <input type="text" className="form-control" required value={newDoctor.hospital} onChange={(e) => setNewDoctor({...newDoctor, hospital: e.target.value})} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'var(--txt-secondary)' }}>Consultation Fee ($)</label>
                                    <input type="number" className="form-control" required value={newDoctor.consultationFee} onChange={(e) => setNewDoctor({...newDoctor, consultationFee: e.target.value})} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 text-end">
                            <button type="submit" className="btn btn-premium px-5 py-2 fw-bold">Create Doctor Profile</button>
                        </div>
                    </form>
                </div>
            )}

            {activeTab === 'doctors' && (
                <div className="glass-card p-4 animate-fade-in">
                    <h4 className="fw-bold mb-4" style={{ color: 'var(--txt-primary)' }}>Doctor Verification Queue</h4>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle" style={{ color: 'var(--txt-primary)' }}>
                            <thead>
                                <tr>
                                    <th>Doctor Name</th>
                                    <th>Specialization</th>
                                    <th>Hospital</th>
                                    <th>Status</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="5" className="text-center py-5"><div className="spinner-border text-primary"></div></td></tr>
                                ) : doctors.length > 0 ? (
                                    doctors.map(doc => (
                                        <tr key={doc._id}>
                                            <td className="fw-semibold">{doc.userId?.name || 'Unknown'}</td>
                                            <td style={{ color: 'var(--txt-secondary)' }}>{doc.specialization}</td>
                                            <td style={{ color: 'var(--txt-secondary)' }}>{doc.hospital}</td>
                                            <td>
                                                <span className={`badge ${
                                                    doc.approvalStatus === 'Approved' ? 'badge-approved' : 
                                                    doc.approvalStatus === 'Pending' ? 'badge-pending' : 
                                                    'badge-cancelled'
                                                }`}>{doc.approvalStatus}</span>
                                            </td>
                                            <td className="text-end">
                                                {doc.approvalStatus === 'Pending' ? (
                                                    <div className="d-flex justify-content-end gap-2">
                                                        <button className="btn btn-sm btn-success rounded-pill px-3" onClick={() => updateDoctorStatus(doc._id, 'Approved')}>Approve</button>
                                                        <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={() => updateDoctorStatus(doc._id, 'Rejected')}>Reject</button>
                                                    </div>
                                                ) : <span className="text-muted small">—</span>}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="5" className="text-center text-muted py-5">No doctors found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'users' && (
                <div className="row g-4 animate-fade-in">
                    {/* Retrieve & Delete Column */}
                    <div className="col-lg-8">
                        <div className="glass-card p-4 h-100">
                            <h4 className="fw-bold mb-4" style={{ color: 'var(--txt-primary)' }}>All User Accounts</h4>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle" style={{ color: 'var(--txt-primary)' }}>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Gender</th>
                                            <th className="text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr><td colSpan="5" className="text-center py-5"><div className="spinner-border text-primary"></div></td></tr>
                                        ) : users.length > 0 ? (
                                            users.map(u => (
                                                <tr key={u._id}>
                                                    <td className="fw-semibold">{u.name}</td>
                                                    <td style={{ color: 'var(--txt-secondary)' }}>{u.email}</td>
                                                    <td>
                                                        <span className={`badge ${
                                                            u.role === 'Admin' ? 'badge-cancelled' : 
                                                            u.role === 'Doctor' ? 'badge-completed' : 
                                                            'badge-approved'
                                                        }`}>{u.role}</span>
                                                    </td>
                                                    <td style={{ color: 'var(--txt-secondary)' }}>{u.gender || 'N/A'}</td>
                                                    <td className="text-end">
                                                        {u.email !== user.email ? (
                                                            <button 
                                                                 className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1 rounded-pill px-3"
                                                                 onClick={() => handleDeleteUser(u._id, u.name)}
                                                            >
                                                                <FaTrash size={12} /> Delete
                                                            </button>
                                                        ) : (
                                                            <span className="text-muted small fst-italic">Logged In</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan="5" className="text-center text-muted py-5">No user accounts found.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Storing/Create Form Column */}
                    <div className="col-lg-4">
                        <div className="glass-card p-4">
                            <h4 className="fw-bold mb-4 d-flex align-items-center gap-2" style={{ color: 'var(--txt-primary)' }}>
                                <div className="d-inline-flex p-2 rounded-circle" style={{ background: 'var(--teal-50)', color: 'var(--teal-600)' }}>
                                    <FaUserPlus size={16} />
                                </div>
                                Store New User
                            </h4>
                            <form onSubmit={handleCreateUser}>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'var(--txt-secondary)' }}>Full Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="e.g. John Smith"
                                        value={newUser.name}
                                        onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'var(--txt-secondary)' }}>Email (Login ID)</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        placeholder="john@example.com"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'var(--txt-secondary)' }}>Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        placeholder="Minimum 6 characters"
                                        value={newUser.password}
                                        onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'var(--txt-secondary)' }}>Role</label>
                                    <select 
                                        className="form-select" 
                                        value={newUser.role}
                                        onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                                    >
                                        <option value="Patient">Patient</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'var(--txt-secondary)' }}>Gender</label>
                                    <select 
                                        className="form-select" 
                                        value={newUser.gender}
                                        onChange={(e) => setNewUser({...newUser, gender: e.target.value})}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" style={{ color: 'var(--txt-secondary)' }}>Phone Number</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="e.g. 1234567890"
                                        value={newUser.phone}
                                        onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                                    />
                                </div>
                                <button type="submit" className="btn btn-premium w-100 py-2 d-flex justify-content-center align-items-center gap-2">
                                    <FaUserPlus /> Save User Details
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'analytics' && (
                <div className="glass-card p-4 p-md-5 animate-fade-in">
                    <h4 className="fw-bold mb-4 d-flex align-items-center gap-2" style={{ color: 'var(--txt-primary)' }}>
                        <div className="d-inline-flex p-2 rounded-circle" style={{ background: 'var(--teal-50)', color: 'var(--teal-600)' }}>
                            <FaChartBar size={20} />
                        </div>
                        Appointment Analytics
                    </h4>
                    <div className="row g-4 mb-5">
                        <div className="col-md-4">
                            <div className="p-4 rounded-4 text-center h-100" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                                <div className="d-inline-flex p-3 rounded-circle mb-3" style={{ background: 'var(--teal-100)', color: 'var(--teal-700)' }}>
                                    <FaCalendarAlt size={24} />
                                </div>
                                <h6 style={{ color: 'var(--txt-secondary)' }}>Total Appointments</h6>
                                <h2 className="fw-bold m-0" style={{ color: 'var(--txt-primary)' }}>{analytics?.totalAppointments ?? 0}</h2>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4 rounded-4 text-center h-100" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                                <div className="d-inline-flex p-3 rounded-circle mb-3" style={{ background: 'var(--emerald-100)', color: 'var(--emerald-600)' }}>
                                    <FaChartBar size={24} />
                                </div>
                                <h6 style={{ color: 'var(--txt-secondary)' }}>Completed Appointments</h6>
                                <h2 className="fw-bold m-0" style={{ color: 'var(--emerald-600)' }}>{analytics?.completedAppointments ?? 0}</h2>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4 rounded-4 text-center h-100" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                                <div className="d-inline-flex p-3 rounded-circle mb-3" style={{ background: 'var(--teal-50)', color: 'var(--teal-600)' }}>
                                    <FaChartBar size={24} />
                                </div>
                                <h6 style={{ color: 'var(--txt-secondary)' }}>Completion Rate</h6>
                                <h2 className="fw-bold m-0" style={{ color: 'var(--teal-600)' }}>
                                    {analytics?.totalAppointments > 0 
                                        ? Math.round((analytics.completedAppointments / analytics.totalAppointments) * 100) 
                                        : 0}%
                                </h2>
                            </div>
                        </div>
                    </div>

                    <h5 className="fw-bold mb-4" style={{ color: 'var(--txt-primary)' }}>Appointments by Doctor</h5>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0" style={{ color: 'var(--txt-primary)' }}>
                            <thead>
                                <tr>
                                    <th>Doctor Name</th>
                                    <th>Specialization</th>
                                    <th className="text-center">Appointments Count</th>
                                    <th className="text-end">Share of Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analytics?.appointmentsByDoctor?.length > 0 ? (
                                    analytics.appointmentsByDoctor.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="fw-semibold">Dr. {item.doctorName}</td>
                                            <td style={{ color: 'var(--txt-secondary)' }}>{item.specialization}</td>
                                            <td className="text-center">
                                                <span className="badge badge-completed fs-6">{item.count}</span>
                                            </td>
                                            <td className="text-end fw-semibold" style={{ color: 'var(--teal-600)' }}>
                                                {analytics.totalAppointments > 0 
                                                    ? Math.round((item.count / analytics.totalAppointments) * 100) 
                                                    : 0}%
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center text-muted py-5">
                                            No appointments scheduled yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
