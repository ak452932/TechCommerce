import { NavLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { useUser } from './UserContext';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import '../CSS/navbar.css';

export default function AppNavbar() {
  const { user, setUser, loading } = useUser();
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  //  week  days
  const today = new Date();
const options = { weekday: 'long', timeZone: 'Asia/Kolkata' };
const dayInIndia = today.toLocaleDateString('en-IN', options);
const [days,setdays]=useState(dayInIndia);
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [isCharging, setIsCharging] = useState(null);
  const [supported, setSupported] = useState(true);
  const navigate = useNavigate();

  

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

 // console.log("i am timer",time);

 useEffect(()=>{
  const dayTimer=setInterval(()=>{
    const today = new Date();
    const options = { weekday: 'long', timeZone: 'Asia/Kolkata' };
    const dayInIndia = today.toLocaleDateString('en-IN', options);
    setdays(dayInIndia);
  },60000)
  return()=>clearInterval(dayTimer);
 },[])

  useEffect(() => {
    const getBatteryStatus = async () => {
      if (navigator.getBattery) {
        const battery = await navigator.getBattery();
        const updateLevel = () => {
          setBatteryLevel(Math.round(battery.level * 100));
          setIsCharging(battery.charging);
        };
        updateLevel();
        battery.addEventListener("levelchange", updateLevel);
        battery.addEventListener("chargingchange", updateLevel);
        return () => {
          battery.removeEventListener("levelchange", updateLevel);
          battery.removeEventListener("chargingchange", updateLevel);
        };
      } else {
        setSupported(false);
      }
    };
    getBatteryStatus();
  }, []);

  
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  if (loading) return null;
  // if(batteryLevel===40)
  // {
  //  // console.log("Battery 37% - Please charge your device.");
  //  alert("Battery 40% - Please charge your device.");
  // }




  return (
    <Navbar bg="light" expand="lg" className="custom-navbar shadow-sm">
      <div className="status-box ms-3">
              <div className="battery">
                {!supported
                  ? "Battery N/A"
                  : batteryLevel !== null
                  ? `🔋 ${batteryLevel}% ${isCharging ? "⚡" : ""}`
                  : "Battery..."}
              </div>
              <div className="clock">🕒 {time}</div>
              <div className="day">📅 {dayInIndia}</div>
            </div>
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIlRZQfdIMa1D8Wy-cqT3GKpvFdgxDrAq9Eg&s"
            alt="Logo"
            width="40"
            height="40"
            className="logo-img"
          />
          <span className="brand-text">TechBrand</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            <Nav.Link as={NavLink} to="/career">Career</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
            <Nav.Link as={NavLink} to="/shop">Shop</Nav.Link>

            <NavDropdown title="Services" id="services-dropdown">
              <NavDropdown.Item as={NavLink} to="/services/it-consultancy">Web IT Consultancy</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/services/mobile-apps">Mobile App Development</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/services/seo">SEO & Marketing</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/services/cloud">Cloud Solutions</NavDropdown.Item>
             
            </NavDropdown>

            {user?.role === "admin" && (
              <NavDropdown title="Admin Panel" id="admin-dropdown">
                <NavDropdown.Item as={NavLink} to="/Add-product">Add Product</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/AddTeam">Add Team</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/admin/dashboard">Dashboard</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/admin/users">Users</NavDropdown.Item>
                 <NavDropdown.Item as={NavLink} to="/Add-ticket">Request Ticket</NavDropdown.Item>
               
              </NavDropdown>
            )}

            {user ? (
              <>
                <Nav.Link disabled className="fw-bold text-dark" >

                  <p style={{color:"green"}}> Hi, {user.name}</p>
                 
                </Nav.Link>
                <Button variant="outline-danger" size="sm" onClick={logout}>Logout</Button>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            )}

            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}





// // if()
// //    if(sum>0)
// // {
// //   for(int i=0;i<n;i++)    // o(n) 
// //   {

// //   }

// //   if(sum==0)
// //   {
// //     sum=0
// //   }

// // }

// int nums=[1,2,3,4,5]  // 
// int sum-=0
// for(int i=0;i<nums.length;i++) 
//   {                                 // best  log(n)
//     sum+=nums[i];

//     if(sum>=num.size())
//     {
//       break;
//     }
//   } // o(n

   


//   //ES6

//   // three variav

//   // 

//   var=undefinded
//   let= undeifen
//   const=assignemt // mssing


//    var=undefined  let=temporal ded zone  

//    // call stack
//    web api
//    task stack
//    //

//    console.log("start")

//    steTimeout(()=>{
//     console.log("hello")// macrotask
//    },0)

//    Promise.resolve().then(()=>{
//     console.log("promise") // microtask
//    }
//    console.log("end")

//    //start end promise hello





