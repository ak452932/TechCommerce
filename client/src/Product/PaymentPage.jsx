import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, quantity, totalAmount } = location.state || {};
  const [cardNumber, setCardNumber] = useState('');

  const handlePay = () => {
    navigate('/order-success', {
      state: { product, quantity, totalAmount }
    });
  };

  return (
    <div className="container mt-5">
      <h2>💳 Payment</h2>
      <p>Pay ₹{totalAmount} for <strong>{product.name}</strong></p>
      <input
        type="text"
        placeholder="Enter Card Number"
        className="form-control mb-3"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <button className="btn btn-dark" onClick={handlePay}>Confirm Payment</button>
    </div>
  );
}