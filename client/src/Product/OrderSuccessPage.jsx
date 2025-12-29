import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';

export default function OrderSuccessPage() {
  const location = useLocation();
  const { product, quantity, totalAmount } = location.state || {};

  const downloadInvoice = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('🧾 Invoice', 20, 20);
    doc.text(`Product: ${product.name}`, 20, 40);
    doc.text(`Quantity: ${quantity}`, 20, 50);
    doc.text(`Total Amount: ₹${totalAmount}`, 20, 60);
    doc.save('invoice.pdf');
  };

  return (
    <div className="container text-center mt-5">
      <h2 className="text-success">Order Placed Successfully!</h2>
      <p>Thanks for shopping with us. 🛍️</p>
      <button className="btn btn-outline-primary mt-3" onClick={downloadInvoice}>
        Download Invoice
      </button>
    </div>
  );
}