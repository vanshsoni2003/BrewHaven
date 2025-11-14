

import React, { useEffect, useState } from "react";
import axios from "../confige/axios";
import "./MyTable.css";


const MyTable = () => {
  const [bookings, setBookings] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPopup, setShowPopup] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updateDate, setUpdateDate] = useState("");
  const [updateTime, setUpdateTime] = useState("");
  const [updateGuests, setUpdateGuests] = useState(1);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get("/book-table", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Sort bookings by date descending (latest first)
        const sorted = [...res.data].sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });
        setBookings(sorted);
      });
  }, [token]);


  const openUpdateModal = (booking) => {
    setSelectedBooking(booking);
    // Parse date and time robustly
    let date = "";
    let time = "";
    if (booking.date) {
      const dateObj = new Date(booking.date);
      if (!isNaN(dateObj.getTime())) {
        date = dateObj.toISOString().split("T")[0];
        time = dateObj.toTimeString().slice(0,5);
      } else if (booking.date.includes("T")) {
        [date, time] = booking.date.split("T");
        time = time ? time.substring(0,5) : "";
      } else {
        date = booking.date;
        time = "";
      }
    }
    setUpdateDate(date);
    setUpdateTime(time);
    setUpdateGuests(booking.guests || 1);
    setShowUpdateModal(true);
  };

  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };


  const handleUpdateConfirm = () => {
    const bookingId = selectedBooking && (selectedBooking.id || selectedBooking._id);
    if (!selectedBooking || !bookingId) {
      setShowPopup("Booking not found. Please try again.");
      setTimeout(() => setShowPopup(""), 2000);
      setShowUpdateModal(false);
      return;
    }
    // Combine date and time for ISO string
    let newDateTime = updateDate;
    if (updateTime) newDateTime += `T${updateTime}`;
    axios
      .patch(
        `/book-table/${bookingId}`,
        { date: newDateTime, guests: updateGuests },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setBookings((prev) =>
          prev.map((b) =>
            (b.id || b._id) === bookingId ? { ...b, date: newDateTime, guests: updateGuests } : b
          )
        );
        setShowUpdateModal(false);
        setShowPopup("Booking updated successfully!");
        setTimeout(() => setShowPopup(""), 2000);
        setSelectedBooking(null);
      })
      .catch((err) => {
        setShowPopup("Update failed. Please try again.");
        setTimeout(() => setShowPopup(""), 2000);
        setShowUpdateModal(false);
        setSelectedBooking(null);
      });
  };

  const handleCancelConfirm = () => {
    const bookingId = selectedBooking && (selectedBooking.id || selectedBooking._id);
    if (!selectedBooking || !bookingId) return;
    axios
      .delete(`/book-table/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setBookings((prev) => prev.filter((b) => (b.id || b._id) !== bookingId));
        setShowCancelModal(false);
        setShowPopup("Booking cancelled.");
        setTimeout(() => setShowPopup(""), 2000);
      });
  };

  const closeModals = () => {
    setShowUpdateModal(false);
    setShowCancelModal(false);
    setSelectedBooking(null);
  };

  return (
    <div className="my-table-page">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="my-table-table-container">
          <table className="my-table-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Guests</th>
                <th>Table Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                // Use id or _id for all actions and keys
                const bookingId = booking.id || booking._id;
                let dateStr = "";
                let timeStr = "";
                if (booking.date) {
                  const dateObj = new Date(booking.date);
                  if (!isNaN(dateObj.getTime())) {
                    dateStr = dateObj.toLocaleDateString();
                    timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    if (timeStr === "12:00 AM" || timeStr === "00:00") timeStr = "—";
                  } else {
                    dateStr = booking.date;
                    timeStr = "—";
                  }
                }
                return (
                  <tr key={bookingId || Math.random()} className="my-table-booking-row">
                    <td>{booking.name}</td>
                    <td>{dateStr}</td>
                    <td>{timeStr}</td>
                    <td>{booking.guests}</td>
                    <td className="table-number-cell">{booking.tableNumber ? booking.tableNumber : '-'}</td>
                    <td>
                      <button className="my-table-action-btn" onClick={() => openUpdateModal(booking)} style={{marginRight:8}}>Update</button>
                      <button className="my-table-action-btn my-table-cancel-btn" onClick={() => openCancelModal(booking)}>Cancel</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="mytable-modal-overlay">
          <div className="mytable-modal">
            <h3>Update Booking</h3>
            <div style={{marginBottom:16, display:'flex', flexDirection:'column', gap:12}}>
              <label style={{color:'#dcca87', textAlign:'left'}}>Date:
                <input
                  type="date"
                  value={updateDate}
                  onChange={e => setUpdateDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  style={{marginLeft:8}}
                />
              </label>
              <label style={{color:'#dcca87', textAlign:'left'}}>Time:
                <input
                  type="time"
                  value={updateTime}
                  onChange={e => setUpdateTime(e.target.value)}
                  style={{marginLeft:8}}
                />
              </label>
              <label style={{color:'#dcca87', textAlign:'left'}}>Guests:
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={updateGuests}
                  onChange={e => setUpdateGuests(Number(e.target.value))}
                  style={{marginLeft:8, width:60}}
                />
              </label>
            </div>
            <div className="mytable-modal-actions">
              <button onClick={handleUpdateConfirm}>Confirm Update</button>
              <button onClick={closeModals} className="mytable-cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="mytable-modal-overlay">
          <div className="mytable-modal">
            <h3>Cancel Booking</h3>
            <p>Are you sure you want to cancel this booking?</p>
            <div className="mytable-modal-actions">
              <button onClick={handleCancelConfirm}>Yes, Cancel</button>
              <button onClick={closeModals} className="mytable-cancel-btn">No</button>
            </div>
          </div>
        </div>
      )}

      {/* Popup */}
      {showPopup && (
        <div className="mytable-popup">{showPopup}</div>
      )}
    </div>
  );
};

export default MyTable;
