import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Crown } from 'lucide-react';

export default function ClassSelection() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('');
  const [insurance, setInsurance] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('flightClass', selectedClass);
    localStorage.setItem('insurance', JSON.stringify(insurance));
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img
          src="https://images.unsplash.com/photo-1544016768-982d1554f0b9"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Select Your Travel Class</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedClass === 'economy'
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedClass('economy')}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Economy Class</h3>
                  <input
                    type="radio"
                    name="class"
                    checked={selectedClass === 'economy'}
                    onChange={() => setSelectedClass('economy')}
                    className="h-4 w-4 text-indigo-600"
                  />
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Standard seating comfort</li>
                  <li>• Complimentary meals</li>
                  <li>• 15kg baggage allowance</li>
                  <li>• Basic entertainment system</li>
                </ul>
              </div>

              <div
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedClass === 'premium'
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedClass('premium')}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Premium Class</h3>
                  <input
                    type="radio"
                    name="class"
                    checked={selectedClass === 'premium'}
                    onChange={() => setSelectedClass('premium')}
                    className="h-4 w-4 text-indigo-600"
                  />
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Extra legroom and comfort</li>
                  <li>• Premium dining experience</li>
                  <li>• 30kg baggage allowance</li>
                  <li>• Priority boarding</li>
                  <li>• Lounge access</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-xl border-2 border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Shield className="w-6 h-6 text-indigo-600" />
                  <div>
                    <h3 className="text-lg font-semibold">Travel Insurance</h3>
                    <p className="text-gray-600">Protect your journey with our comprehensive coverage</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={insurance}
                    onChange={(e) => setInsurance(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!selectedClass}
                className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}