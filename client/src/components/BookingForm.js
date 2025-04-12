// components/BookingForm.js
import React, { useState, useEffect } from 'react';
import { checkAvailability, createBooking } from '../services/bookingService';

const BookingForm = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [table, setTable] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [availableTables, setAvailableTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Time slots
  const timeSlots = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', 
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
  ];

  // Check availability when date and time change
  useEffect(() => {
    const checkTableAvailability = async () => {
      if (date && time) {
        setLoading(true);
        try {
          const { data } = await checkAvailability(date, time);
          setAvailableTables(data.availableTables);
          if (data.availableTables.length === 0) {
            setMessage('No tables available for this time slot');
          } else {
            setMessage('');
          }
        } catch (error) {
          setMessage('Error checking availability');
        } finally {
          setLoading(false);
        }
      }
    };

    checkTableAvailability();
  }, [date, time]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time || !table) {
      setMessage('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      await createBooking({
        date,
        time,
        guests,
        table,
        specialRequests
      });
      
      // Clear form and show success message
      setDate('');
      setTime('');
      setGuests(2);
      setTable('');
      setSpecialRequests('');
      setMessage('Booking created successfully!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error creating booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Book a Table</h2>
      
      {message && (
        <div className={`p-3 mb-4 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Time</label>
          <select
            className="w-full px-3 py-2 border rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          >
            <option value="">Select a time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Number of Guests</label>
          <select
            className="w-full px-3 py-2 border rounded"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            required
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'person' : 'people'}
              </option>
            ))}
          </select>
        </div>
        
        {availableTables.length > 0 && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select a Table</label>
            <div className="grid grid-cols-3 gap-2">
              {availableTables.map((tableNum) => (
                <button
                  key={tableNum}
                  type="button"
                  className={`p-2 border rounded ${
                    table === tableNum ? 'bg-green-500 text-white' : 'bg-gray-100'
                  }`}
                  onClick={() => setTable(tableNum)}
                >
                  Table {tableNum}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Special Requests</label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            rows="3"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
          disabled={loading || availableTables.length === 0 || !table}
        >
          {loading ? 'Processing...' : 'Book Now'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;