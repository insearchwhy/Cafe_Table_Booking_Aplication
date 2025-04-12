// routes/bookingRoutes.js
const express = require('express');
const { 
  createBooking, 
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  checkAvailability
} = require('../controllers/bookingcontroller');
const { protect, admin } = require('../controllers/authcontroller');

const router = express.Router();

// Public routes
router.get('/availability', checkAvailability);

// Protected routes
router.use(protect);
router.post('/', createBooking);
router.get('/my-bookings', getUserBookings);

// Admin routes
router.use(admin);
router.get('/', getAllBookings);
router.patch('/:id/status', updateBookingStatus);

module.exports = router;