import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './Component/Navbar';
import Hero from './Component/Hero';
import Services from './Component/Services';
import Features from './Component/Features';
import Testimonial from './Component/Testimonial';
import ContactForm from './Component/ContactForm';
import AboutPage from './Component/AboutPage';
import Signup from './LoginDetail/Singup';
import Login from './LoginDetail/Login';
import ForgotPassword from './LoginDetail/ForgotPassword.jsx';
import VerifyOtp from './LoginDetail/VerifyOtp';
import ResetPassword from './LoginDetail/ResetPassword';
import 'bootstrap/dist/css/bootstrap.min.css';
import JobBoard from './Component/JobBoard';

import AddProduct from './Product/AddProduct.jsx'
import Shopmenu from './Product/Shopmenu.jsx'
import Cart from './Product/Cart.jsx'
import CheckoutPage from './Product/CheckoutPage.jsx';
import PaymentPage from './Product/PaymentPage.jsx'
import Dashboard from './Admin/AdminDashboard.jsx';
import User from './Admin/User.jsx';

import RequestTicketForm from './Ticket/Addticket.jsx'

//import OrderSuccessPage from './Product/OrderSuccessPage.jsx'




import FloatingChatBox from './Component/FloatingChatBox';
// Importing necessary components for routing
// Services
import ITConsultancy from './Services/ITConsultancy';
import MobileAppDevelopment from './Services/MobileAppDevelopment';
import AdminAddTeamMember from './Component/AdminTeammember';


// CSS
import './App.css';
import OrderSuccessPage from './Product/OrderSuccessPage.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <FloatingChatBox />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Services />
              <Features />
              <Testimonial />
            </>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/AddTeam" element={<AdminAddTeamMember />} />
         

        <Route path="/Career" element={<JobBoard />} />

        <Route path="/contact" element={<ContactForm />} />
        
        <Route path="/Add-product" element={<AddProduct />} />
        <Route path="/shop" element={<Shopmenu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="Add-ticket" element={<RequestTicketForm/>}/>


        <Route path="/Signup" element={<Signup />} />
         <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<User />} />
        


        <Route path="/services/it-consultancy" element={<ITConsultancy />} />
        <Route path="/services/mobile-apps" element={<MobileAppDevelopment />} />
        {/* Add more <Route /> entries as needed */}
      </Routes>
    </Router>
  );
}

export default App;