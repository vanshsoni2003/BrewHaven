
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TableBooking.css";

const TableBooking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "",
  });
  const [timeSlots, setTimeSlots] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setMessage("Please log in to book a table.");
      navigate("/login"); // Redirect if no token
    }
  }, [navigate]);


  // Date and time slot logic
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  const maxDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const getTimeSlots = (dateStr) => {
    if (!dateStr) return [];
    const date = new Date(dateStr);
    const day = date.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    let start = (day === 0 || day === 6) ? 10 : 11; // Sat/Sun: 10, else 11
    let end = 23; // 11 PM
    const slots = [];
    for (let h = start; h <= end; h++) {
      for (let m = 0; m < 60; m += 30) {
        // Format hour and minute to 12-hour AM/PM
        let hour12 = h % 12 === 0 ? 12 : h % 12;
        let ampm = h < 12 ? 'AM' : 'PM';
        let min = m === 0 ? '00' : '30';
        let label = `${hour12}:${min} ${ampm}`;
        let value = `${h.toString().padStart(2, '0')}:${min}`;
        slots.push({ value, label });
      }
    }
    return slots;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // If date changes, update time slots and reset time
      if (name === "date") {
        setTimeSlots(getTimeSlots(value));
        updated.time = "";
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken"); // Get the token

    if (!token) {
      setMessage("Authentication required. Please log in.");
      navigate("/login");
      return;
    }

    // Combine date and time into a single ISO string for the 'date' field, but also send 'time' for backend validation
    const { name, email, date, time, guests } = formData;
    if (!date || !time) {
      setMessage("Please select both date and time.");
      return;
    }
    const combinedDateTime = new Date(`${date}T${time}:00`);
    const payload = {
      name,
      email,
      date: combinedDateTime.toISOString(),
      time, // send time for backend validation
      guests,
    };

    try {
      const response = await fetch("http://localhost:4000/book-table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Table booked successfully!");
        setFormData({
          name: "",
          email: "",
          date: "",
          time: "",
          guests: "",
        });
      } else {
        setMessage(result.error || "Failed to book the table.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="table-booking-container">
      <h2 className="page-title">Book a Table</h2>
      <form onSubmit={handleSubmit} className="table-booking-form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your Name"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Your Email"
        />

        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          min={minDate}
          max={maxDate}
        />

        <label htmlFor="time">Time</label>
        <select
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          disabled={!formData.date}
        >
          <option value="">Select a time</option>
          {timeSlots.map((slot) => (
            <option key={slot.value} value={slot.value}>{slot.label}</option>
          ))}
        </select>

        <label htmlFor="guests">Number of Guests</label>
        <input
          type="number"
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          required
          placeholder="Number of Guests"
          min="1"
        />

        <button type="submit" className="form-button">
          Book Table
        </button>
      </form>

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default TableBooking;
