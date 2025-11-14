const Booking = require('../model/Booking');

// Create new booking (with user_id)
exports.createBooking = async (req, res) => {
  try {
    // Assign a random table number between 1 and 25
    const tableNumber = Math.floor(Math.random() * 25) + 1;
    const bookingData = { ...req.body, user_id: req.user.id, tableNumber };
    const newBooking = new Booking(bookingData);
    const saved = await newBooking.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Get all bookings for logged-in user, with user details and debug logging
exports.getUserBookings = async (req, res) => {
  try {
    console.log('GET /book-table called by user:', req.user);
      const bookings = await Booking.find({ user_id: req.user.id })
        .populate({ path: 'user_id', select: 'name email' });
      // Convert date to ISO string for frontend compatibility
      const bookingsWithISO = bookings.map(b => {
        const obj = b.toObject();
        obj.date = b.date instanceof Date ? b.date.toISOString() : b.date;
        return obj;
      });
      res.json(bookingsWithISO);
  } catch (err) {
    console.error('Error in getUserBookings:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Update a booking (only if owned by user)
exports.updateUserBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!booking) return res.status(404).json({ message: 'Booking not found or not authorized' });
  // Only update allowed fields
  if (req.body.date) booking.date = new Date(req.body.date);
  if (req.body.time) booking.time = req.body.time;
  if (req.body.guests) booking.guests = req.body.guests;
  await booking.save();
  // Return updated booking with ISO date/time for frontend
  const result = booking.toObject();
  result.date = booking.date instanceof Date ? booking.date.toISOString() : booking.date;
  res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Delete a booking (only if owned by user)
exports.deleteUserBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });
    if (!booking) return res.status(404).json({ message: 'Booking not found or not authorized' });
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};