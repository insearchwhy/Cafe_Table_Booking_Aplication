// services/bookingService.js
import api from './api';

// Check availability
export const checkAvailability = async (date, time) => {
  const response = await api.get(`/bookings/availability?date=${date}&time=${time}`);
  return response.data;
};

// Create booking
export const createBooking = async (bookingData) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

// Get user bookings
export const getUserBookings = async () => {
  const response = await api.get('/bookings/my-bookings');
  return response.data;
};

// Get all bookings (admin)
export const getAllBookings = async () => {
  const response = await api.get('/bookings');
  return response.data;
};

// Update booking status (admin)
export const updateBookingStatus = async (id, status) => {
  const response = await api.patch(`/bookings/${id}/status`, { status });
  return response.data;
};