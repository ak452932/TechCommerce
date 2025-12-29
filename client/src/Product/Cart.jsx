import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Product/Cart.css';


export default function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container text-center mt-5">
        <h3>No product selected</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
          Go Back to Shop
        </button>
      </div>
    );
  }

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const totalAmount = product.amount * quantity;

  return (
    <div className="container mt-5">
      <h2 className="text-success mb-4">🛒 Cart Summary</h2>
      <div className="card shadow-sm p-4">
        <div className="row">
          <div className="col-md-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-8">
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <div className="d-flex align-items-center mb-3">
              <span className="me-2">Quantity:</span>
              <button className="btn btn-sm btn-secondary me-2" onClick={decreaseQty}>−</button>
              <span>{quantity}</span>
              <button className="btn btn-sm btn-secondary ms-2" onClick={increaseQty}>+</button>
            </div>
            <h5 className="text-primary">Total: ₹{totalAmount}</h5>

            <div className="mt-4">
              <button className="btn btn-outline-dark me-3" onClick={() => navigate('/checkout', { state: { product, quantity, totalAmount } })}>
                Next ➡
              </button>
              <button className="btn btn-link" onClick={() => navigate('/')}>
                ⬅ Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}