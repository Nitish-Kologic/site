import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane } from 'lucide-react';

const airlines = [
  'Air India',
  'IndiGo',
  'SpiceJet',
  'Vistara',
  'Go First',
  'AirAsia India'
];

export default function BookingForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    travelDate: '',
    airline: '',
    adults: '1',
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('bookingData', JSON.stringify(formData));
    navigate('/class-selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8">
          <div className="flex items-center justify-center mb-6">
            <Plane className="w-10 h-10 text-indigo-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Flight Booking</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  required
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Travel</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.travelDate}
                  onChange={(e) => setFormData({...formData, travelDate: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Airline</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.airline}
                  onChange={(e) => setFormData({...formData, airline: e.target.value})}
                >
                  <option value="">Select Airline</option>
                  {airlines.map((airline) => (
                    <option key={airline} value={airline}>{airline}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Adults</label>
                <input
                  type="number"
                  required
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.adults}
                  onChange={(e) => setFormData({...formData, adults: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200"
              >
                Continue to Class Selection
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}