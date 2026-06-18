const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    specialization: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: Number, required: true },
    hospital: { type: String, required: true },
    consultationFee: { type: Number, required: true },
    bio: { type: String },
    availableDays: [{ type: String }], // ['Monday', 'Wednesday']
    availableTime: { type: String }, // '10:00 AM - 04:00 PM'
    approvalStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
