export interface BookingFormData {
  name: string;
  age: string;
  travelDate: string;
  airline: string;
  adults: string;
  email: string;
  phone: string;
}

export interface PaymentMethod {
  id: 'card' | 'paytm' | 'gpay' | 'phonepe';
  name: string;
  icon: React.ComponentType;
}