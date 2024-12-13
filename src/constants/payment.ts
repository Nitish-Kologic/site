import { CreditCard, Smartphone } from 'lucide-react';
import type { PaymentMethod } from '../types/booking';

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
  { id: 'paytm', name: 'Paytm', icon: Smartphone },
  { id: 'gpay', name: 'Google Pay', icon: Smartphone },
  { id: 'phonepe', name: 'PhonePe', icon: Smartphone },
];