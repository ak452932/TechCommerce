import { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

import axios from 'axios';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('');
  const { email, otp } = useLocation().state || {};
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/reset-password', { email, otp, newPassword });
      setMsg(res.data.message);
      setMsgType('success');
      navigate('/login'); // Redirect to login after successful reset
    } catch (err) {
      setMsg(err.response?.data?.message || 'Reset failed');
      setMsgType('error');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {msg && <p style={{ color: msgType === 'error' ? 'crimson' : 'green' }}>{msg}</p>}
      <form onSubmit={handleReset}>
        <input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ResetPassword;