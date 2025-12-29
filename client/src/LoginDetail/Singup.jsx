import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Singup.css";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: " ",
  });
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }
    try {
      const res = await axios.post("http://localhost:8000/signup", form);
      if (res.status === 200) {
        alert("OTP sent to your email");
        setShowOtpInput(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Signup error");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/verify-otp", {
        email: form.email,
        otp,
      });
      if (res.status === 200) {
        alert("Signup complete!");
        // Store token in localStorage
      localStorage.setItem("token", res.data.token);

        const userRole=res.data.role||form.role;
         if (userRole === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }

        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="signup-wrapper d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow-lg p-4 form-card">
        <h2 className="text-center mb-4 text-primary fw-bold">
          {showOtpInput ? "Verify OTP" : "Create Account"}
        </h2>

        {!showOtpInput ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input className="form-control" name="name" placeholder="Name" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input className="form-control" name="email" type="email" placeholder="Email" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input className="form-control" name="password" type="password" placeholder="Password" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input className="form-control" name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />
            </div>
           <div className="mb-3">
              <select
                className="form-control"
                name="role"
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button className="btn btn-primary w-100" type="submit">Send OTP</button>
            <p className="text-center mt-3">
              Already have an account? <a href="/login" className="text-decoration-none text-primary fw-semibold">Login</a>
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerify}>
            <div className="mb-3">
              <input className="form-control" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            </div>
            <button className="btn btn-success w-100" type="submit">Verify & Register</button>
          </form>
        )}
      </div>
    </div>
  );
}