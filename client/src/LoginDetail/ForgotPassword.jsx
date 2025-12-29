import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/forgot-password', { email });
      setMessage(res.data.message);
      setMessageType('success');
      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error sending OTP');
      setMessageType('error');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {message && <p style={{ color: messageType === 'error' ? 'crimson' : 'green' }}>{message}</p>}
      <form onSubmit={handleSendOtp}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Enter your email" />
        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
};

export default ForgotPassword;