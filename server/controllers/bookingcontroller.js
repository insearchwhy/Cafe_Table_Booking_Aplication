// controllers/bookingcontroller.js
const Booking = require('../models/Bookng');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { date, time, guests, table, specialRequests } = req.body;

    // Check if table is available
    const existingBooking = await Booking.findOne({
      date: new Date(date),
      time,
      table,
      status: { $ne: 'cancelled' }
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'Table is already booked for this time'
      });
    }

    const booking = await Booking.create({
      user: req.user._id,
      date,
      time,
      guests,
      table,
      specialRequests
    });

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get user bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all bookings (admin only)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email');

    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Check table availability
exports.checkAvailability = async (req, res) => {
  try {
    const { date, time } = req.query;

    // Find all bookings for the date and time
    const bookings = await Booking.find({
      date: new Date(date),
      time,
      status: { $ne: 'cancelled' }
    });

    // Get booked tables
    const bookedTables = bookings.map(booking => booking.table);

    // Available tables (1-10 for simplicity)
    const availableTables = Array.from({ length: 10 }, (_, i) => i + 1)
      .filter(table => !bookedTables.includes(table));

    res.status(200).json({
      success: true,
      data: {
        availableTables,
        bookedTables
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};