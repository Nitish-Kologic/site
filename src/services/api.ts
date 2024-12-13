import axios from 'axios';
import { BookingFormData } from '../types/booking';

const API_URL = 'https://flightbookingapi.onrender.com/api';

export const paymentService = {
  initiatePayment: async (paymentMethod: string, amount: number, bookingDetails: BookingFormData) => {
    const response = await axios.post(`${API_URL}/payment/initiate`, {
      paymentMethod,
      amount,
      bookingDetails
    });
    return response.data;
  },

  confirmPayment: async (bookingDetails: BookingFormData) => {
    const response = await axios.post(`${API_URL}/payment/confirm`, {
      bookingDetails
    });
    return response.data;
  }
};