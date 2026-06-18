const express = require('express');
const router = express.Router();
const { 
    getDoctors, 
    getDoctorById, 
    updateDoctorStatus 
} = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.put('/:id/status', protect, authorize('Admin'), updateDoctorStatus);

module.exports = router;
