import React from 'react';
import '../CSS/Login.css';
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../Component/UserContext';
import { Button } from 'react-bootstrap';

const Login = () => {
    const nevigate=useNavigate();

    const {user,setUser}=useUser();
    // Assuming useUser is a custom hook that provides user context
    // If you have a different way to set user context, adjust accordingly
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const { exp } = JSON.parse(atob(token.split(".")[1]));
      const expiryTime = exp * 1000;
      const now = Date.now();

      if (now >= expiryTime) {
        // Token already expired
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        nevigate("/login");
      } else {
        // Schedule auto logout exactly at expiry
        const timeout = setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          nevigate("/login");
        }, expiryTime - now);

        return () => clearTimeout(timeout);
      }
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      nevigate("/login");
    }
  }
}, []);


    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Login attempt with:', { email, password });
        try {
            const response = await axios.post('http://localhost:8000/login', { email, password });
            if (response.status === 200) {
                // const userData = response.data.user;
                // setUser(userData); // Assuming setUser is a function to update user context
                // localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
                // console.log('Login successful:', response.data);
                // nevigate('/'); // Assuming you have a navigate function from react-router-dom
                // // You can also store the token in localStorage or context for further use
                // // Redirect or perform further actions

                const { user, token } = response.data;

             setUser(user); // update context
             localStorage.setItem("user", JSON.stringify(user)); // optional
           localStorage.setItem("token", token); // NEW: store token for auth

               console.log("Login successful");
                 nevigate("/");

            }
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed');
        }   
}

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 login-wrapper">
      <div className="card shadow p-4 login-card">
        <h2 className="text-center mb-4">Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <div className="d-flex justify-content-between mt-3">
            <a href="/forgot-password" className="text-decoration-none">Forgot Password?</a>
            <a href="/Signup" className="text-decoration-none">Sign up</a>
          </div>
        </form>
      </div>
    </div>

  );
};

export default Login;