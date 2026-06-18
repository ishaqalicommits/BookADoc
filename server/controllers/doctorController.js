const Doctor = require('../models/Doctor');
const User = require('../models/User');

// @desc    Register a doctor profile
// @route   POST /api/doctors
// @access  Private (Doctor)
exports.createDoctorProfile = async (req, res) => {
    try {
        const doctorExists = await Doctor.findOne({ userId: req.user._id });
        if (doctorExists) {
            return res.status(400).json({ message: 'Doctor profile already exists' });
        }

        const doctor = await Doctor.create({
            userId: req.user._id,
            ...req.body,
            approvalStatus: 'Pending'
        });

        res.status(201).json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all approved doctors with filters
// @route   GET /api/doctors
// @access  Public
exports.getDoctors = async (req, res) => {
    const { specialization, search } = req.query;
    let query = { approvalStatus: 'Approved' };

    if (specialization) {
        query.specialization = specialization;
    }

    try {
        let doctors = await Doctor.find(query).populate('userId', 'name email profileImage');
        
        if (search) {
            doctors = doctors.filter(doc => 
                doc.userId.name.toLowerCase().includes(search.toLowerCase()) ||
                doc.specialization.toLowerCase().includes(search.toLowerCase())
            );
        }

        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email phone gender profileImage');
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update doctor status (Admin)
// @route   PUT /api/doctors/:id/status
// @access  Private (Admin)
exports.updateDoctorStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (doctor) {
            doctor.approvalStatus = status;
            await doctor.save();
            res.json(doctor);
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
