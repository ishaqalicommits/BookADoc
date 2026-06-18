const express = require('express');
const router = express.Router();
const { adminLogin, addDoctor, getAnalytics } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Admin login (public, but verifies role inside controller)
router.post('/login', adminLogin);

// Protect all following routes to admin only
router.use(protect);
router.use(authorize('Admin'));

// Add a new doctor (admin only)
router.post('/doctors', addDoctor);

// Get analytics data (admin only)
router.get('/analytics', getAnalytics);

module.exports = router;
