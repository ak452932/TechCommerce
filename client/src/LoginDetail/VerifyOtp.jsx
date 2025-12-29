import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleVerify = (e) => {
    e.preventDefault();
    navigate('/reset-password', { state: { email, otp } });
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleVerify}>
        <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" required />
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default VerifyOtp;