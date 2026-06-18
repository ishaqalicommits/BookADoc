const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT (reuse same secret)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Admin login – only users with role 'Admin'
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await User.findOne({ email, role: 'Admin' });
    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid admin credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new doctor – admin only
exports.addDoctor = async (req, res) => {
  const { userId, specialization, qualification, experience, hospital, consultationFee, bio, availableDays, availableTime } = req.body;
  try {
    // Ensure the referenced user exists and is not already a doctor
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    // Create doctor profile
    const doctor = await Doctor.create({
      userId,
      specialization,
      qualification,
      experience,
      hospital,
      consultationFee,
      bio,
      availableDays,
      availableTime,
      approvalStatus: 'Approved',
    });
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get analytics for appointments
exports.getAnalytics = async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments();
    const completedAppointments = await Appointment.countDocuments({ status: 'Completed' });
    const appointmentsByDoctor = await Appointment.aggregate([
      { $group: { _id: '$doctorId', count: { $sum: 1 } } },
      {
        $lookup: {
          from: 'doctors',
          localField: '_id',
          foreignField: '_id',
          as: 'doctorInfo',
        },
      },
      { $unwind: '$doctorInfo' },
      {
        $lookup: {
          from: 'users',
          localField: 'doctorInfo.userId',
          foreignField: '_id',
          as: 'userInfo',
        },
      },
      { $unwind: '$userInfo' },
      {
        $project: {
          _id: 0,
          doctorId: '$_id',
          doctorName: '$userInfo.name',
          specialization: '$doctorInfo.specialization',
          count: 1,
        },
      },
    ]);
    res.json({ totalAppointments, completedAppointments, appointmentsByDoctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
