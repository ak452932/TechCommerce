import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'

export default  function CheckoutPage()
{
    const location = useLocation()
    const navigate=useNavigate();
    const {product,quantity,totalAmount}=location.state || {};
    if(!product)
    {
         return (
      <div className="container mt-5 text-center">
        <h3>No product info found</h3>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
    }
     
    return(
        <div className='container mt-5'>
            <h2>Checkout Summary</h2>
            <p><strong>Product</strong> {product.name}</p>
            <p><strong>image</strong> {product.imageurl}</p>
            <p><strong>Quantity:</strong> {quantity}</p>
         <p><strong>Total:</strong> ₹{totalAmount}</p>
<button className="btn btn-success" onClick={() =>
        navigate('/payment', { state: { product, quantity, totalAmount } })
      }>
        Proceed to Payment
      </button>

        </div>
    )

}
//export default CheckoutPage;