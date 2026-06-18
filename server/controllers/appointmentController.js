const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// @desc    Book an appointment
// @route   POST /api/appointments
// @access  Private (Patient)
exports.bookAppointment = async (req, res) => {
    const { doctorId, appointmentDate, appointmentTime, reason } = req.body;

    try {
        const appointment = await Appointment.create({
            patientId: req.user._id,
            doctorId,
            appointmentDate,
            appointmentTime,
            reason
        });

        await appointment.populate([
            {
                path: 'doctorId',
                populate: { path: 'userId', select: 'name profileImage' }
            },
            { path: 'patientId', select: 'name email' }
        ]);
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user appointments
// @route   GET /api/appointments
// @access  Private
exports.getMyAppointments = async (req, res) => {
    try {
        let appointments;
        if (req.user.role === 'Patient') {
            appointments = await Appointment.find({ patientId: req.user._id })
                .populate({
                    path: 'doctorId',
                    populate: { path: 'userId', select: 'name profileImage' }
                });
        } else if (req.user.role === 'Doctor') {
            const doctor = await Doctor.findOne({ userId: req.user._id });
            appointments = await Appointment.find({ doctorId: doctor._id })
                .populate('patientId', 'name email phone');
        } else {
            appointments = await Appointment.find({})
                .populate('patientId', 'name')
                .populate({
                    path: 'doctorId',
                    populate: { path: 'userId', select: 'name' }
                });
        }
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private
exports.updateAppointmentStatus = async (req, res) => {
    const { status, notes } = req.body;
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (appointment) {
            appointment.status = status || appointment.status;
            appointment.notes = notes || appointment.notes;
            await appointment.save();
            res.json(appointment);
        } else {
            res.status(404).json({ message: 'Appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
