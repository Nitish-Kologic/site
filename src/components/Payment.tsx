import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { paymentService } from '../services/api';
import { PageContainer } from './ui/PageContainer';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { PAYMENT_METHODS } from '../constants/payment';

export default function Payment() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: ''
  });

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod) {
      toast.error('Please select a payment method');
      return;
    }

    setLoading(true);

    try {
      const bookingData = JSON.parse(localStorage.getItem('bookingData') || '{}');
      const flightClass = localStorage.getItem('flightClass');
      const amount = calculateAmount(bookingData, flightClass);

      const paymentResponse = await paymentService.initiatePayment(
        selectedMethod,
        amount,
        bookingData
      );

      if (selectedMethod === 'card') {
        await processCardPayment();
      } else {
        setQrCode(paymentResponse.qrCode);
        return;
      }

      await paymentService.confirmPayment(bookingData);
      toast.success('Payment successful! Confirmation sent to your email and phone.');
      navigate('/confirmation');
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateAmount = (bookingData: any, flightClass: string | null) => {
    const basePrice = 5000; // Base price in INR
    const adults = parseInt(bookingData.adults) || 1;
    const classMultiplier = flightClass === 'premium' ? 2 : 1;
    return basePrice * adults * classMultiplier;
  };

  const processCardPayment = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return true;
  };

  return (
    <PageContainer backgroundImage="https://images.unsplash.com/photo-1536318431364-5cc762cfc8ec">
      <div className="max-w-3xl mx-auto">
        <Card>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Payment Details</h2>

          <form onSubmit={handlePayment} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PAYMENT_METHODS.map((method) => (
                <div
                  key={method.id}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedMethod === method.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className="flex items-center space-x-4">
                    <method.icon className="w-6 h-6 text-indigo-600" />
                    <span className="font-medium">{method.name}</span>
                    {selectedMethod === method.id && (
                      <Check className="w-5 h-5 text-green-500 ml-auto" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {selectedMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Card Number</label>
                  <input
                    type="text"
                    maxLength={16}
                    placeholder="1234 5678 9012 3456"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CVV</label>
                    <input
                      type="password"
                      maxLength={3}
                      placeholder="123"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={!selectedMethod || loading}
                className="w-full md:w-auto"
              >
                {loading ? 'Processing...' : 'Pay Now'}
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {qrCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4 text-center">Scan QR Code to Pay</h3>
            <img src={qrCode} alt="Payment QR Code" className="mb-4 mx-auto" />
            <Button
              variant="secondary"
              onClick={() => setQrCode('')}
              className="w-full"
            >
              Cancel
            </Button>
          </Card>
        </div>
      )}
    </PageContainer>
  );
}