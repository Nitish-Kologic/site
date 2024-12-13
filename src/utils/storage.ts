import type { BookingFormData } from '../types/booking';

export const storage = {
  setBookingData: (data: BookingFormData) => {
    localStorage.setItem('bookingData', JSON.stringify(data));
  },
  
  getBookingData: (): BookingFormData => {
    return JSON.parse(localStorage.getItem('bookingData') || '{}');
  },
  
  setFlightClass: (flightClass: string) => {
    localStorage.setItem('flightClass', flightClass);
  },
  
  getFlightClass: () => {
    return localStorage.getItem('flightClass');
  },
  
  setInsurance: (hasInsurance: boolean) => {
    localStorage.setItem('insurance', JSON.stringify(hasInsurance));
  },
  
  getInsurance: () => {
    return JSON.parse(localStorage.getItem('insurance') || 'false');
  }
};