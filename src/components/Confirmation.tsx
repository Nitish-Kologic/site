import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function Confirmation() {
  const navigate = useNavigate();
  const bookingData = JSON.parse(localStorage.getItem('bookingData') || '{}');
  const flightClass = localStorage.getItem('flightClass');
  const insurance = JSON.parse(localStorage.getItem('insurance') || 'false');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800">Booking Confirmed!</h2>
            <p className="text-gray-600 mt-2">
              Your flight has been successfully booked. A confirmation has been sent to your email and phone.
            </p>
          </div>

          <div className="space-y-6">
            <div className="border-t border-b border-gray-200 py-4">
              <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-gray-600">Passenger Name</dt>
                  <dd className="font-medium">{bookingData.name}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Airline</dt>
                  <dd className="font-medium">{bookingData.airline}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Travel Date</dt>
                  <dd className="font-medium">{bookingData.travelDate}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Number of Adults</dt>
                  <dd className="font-medium">{bookingData.adults}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Class</dt>
                  <dd className="font-medium capitalize">{flightClass}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Insurance</dt>
                  <dd className="font-medium">{insurance ? 'Yes' : 'No'}</dd>
                </div>
              </dl>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200"
              >
                Book Another Flight
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}