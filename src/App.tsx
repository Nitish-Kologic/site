import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import BookingForm from './components/BookingForm';
import ClassSelection from './components/ClassSelection';
import Payment from './components/Payment';
import Confirmation from './components/Confirmation';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<BookingForm />} />
        <Route path="/class-selection" element={<ClassSelection />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  );
}

export default App;