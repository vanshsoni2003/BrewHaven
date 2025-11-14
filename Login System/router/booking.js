const express = require('express');
const router = express.Router();

const bookingController = require('../controller/bookingController');
const { check_token } = require('../middleware/auth');

// Book a table (create)
router.post('/book-table', check_token, bookingController.createBooking);
// Get all bookings for logged-in user
router.get('/book-table', check_token, bookingController.getUserBookings);
// Update a booking (only if owned by user)
router.patch('/book-table/:id', check_token, bookingController.updateUserBooking);
// Delete a booking (only if owned by user)
router.delete('/book-table/:id', check_token, bookingController.deleteUserBooking);

// Legacy routes (optional, can be removed if not needed)
// router.get('/', bookingController.getAllBookings);
// router.get('/:id', bookingController.getBookingById);
// router.put('/:id', bookingController.updateBooking);
// router.delete('/:id', bookingController.deleteBooking);

module.exports = router;