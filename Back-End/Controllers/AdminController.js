const nodemailer = require("nodemailer");
//const sendgridTransport = require("nodemailer-sendgrid-transport");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const TeamMember = require("../models/Teammember");
const Addticket=require("../models/Addticketmodels")
const Product=require('../models/product')
const jwt=require("jsonwebtoken");
const axios = require('axios');
const { generatejwttoken } = require("../utils/authUtils");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
//const bcrypt=require('bcrypt');



const otpStore = {};
const transporter = nodemailer.createTransport({
       host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT, // Use 587 for TLS if preferred
  secure: true, // true for 465, false for 587
  auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,        // Gmail App Password
  }

});
exports.signupUser = async (req, res) => {
  console.log("Received signup request:", req.body);
  try {
    const { name, email, password, confirmPassword,role } = req.body;

    if (!name || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const otp = otpGenerator.generate(6, {
      upperCase: false,
      digits: true,
      specialChars: false
    });
    
    otpStore[email] = { otp, name, password,role, timestamp: Date.now() };
    try {
      await transporter.sendMail({
        from: "akhileshkumar545232@gmail.com", 
        to: email,
        subject: "Your OTP Code",
        html: `<p>Hi ${name},</p><p>Your OTP is <strong>${otp}</strong>. It expires in 5 minutes.
         <h3> Best Regards.</h3>
          <h3>Team Servicehub</h3>
     </p>`
      });
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    console.log(otp)
    res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Handle OTP verification and user creation
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = otpStore[email];

    if (!record) {
      return res.status(404).json({ message: "No OTP record found" });
    }

    const isExpired = Date.now() - record.timestamp > 5 * 60 * 1000;
    if (isExpired) {
      delete otpStore[email];
      return res.status(400).json({ message: "OTP expired" });
    }

    if (otp !== record.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(record.password, 10);

    const user = new User({
      name: record.name,
      email,
      password: hashedPassword,
      role:record.role,
      isVerified: true,
    });

    await user.save();
    delete otpStore[email];
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );



    res.status(200).json({ message: "User registered successfully", token ,role:user.role});
  } catch (err) {
    console.error("OTP verification error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with:", User.find());

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT token with role and userId
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1m" }
    );

    // Print token to console
    console.log("Generated JWT token:", token);



    // Remove password before sending user data
    const sanitizedUser = user.toObject();
    delete sanitizedUser.password;

     res.status(200).json({
      message: "Login successful",
      user: sanitizedUser,
      token,
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new team member
exports.addTeamMember = async (req, res) => {
  console.log("Adding team member with data:", req.body);
const { name, role, description, imageUrl } = req.body;
  const newMember = new TeamMember({ name, role, description, imageUrl });
  await newMember.save();
  res.status(201).json({ message: 'Team member added' });

}

exports.getTeamMembers = async (req, res) => {
  const members = await TeamMember.find();  
  console.log("Retrieved team members:", members);
  res.status(200).json(members);
}
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log("Forgot password request for:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      digits: true,
      specialChars: false
    });

    otpStore[email] = { otp, timestamp: Date.now() };
    console.log("Generated OTP:", otp);
    await transporter.sendMail({
      from: "akhileshkumar545232@gmail.com", // ✅ Use verified domain email
      to: email,
      subject: "Password Reset OTP",
      html: `<p>Your OTP for password reset is <strong>${otp}</strong>. It
expires in 5 minutes.
     <h3> Best Regards.</h3>
     <h3>Team Servicehub</h3>

</p>`
    });
    res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  console.log("Reset password request for:", email);

  try {
    const record = otpStore[email];
    if (!record) {
      return res.status(404).json({ message: "No OTP record found" });
    }

    const isExpired = Date.now() - record.timestamp > 5 * 60 * 1000;
    if (isExpired) {
      delete otpStore[email];
      return res.status(400).json({ message: "OTP expired" });
    }

    if (otp !== record.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashedPassword });
    delete otpStore[email];

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

exports.addProduct = async (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  console.log("Adding product with data:", req.body);

  try {
    const newProduct = new Product({ name, description, price, imageUrl });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

exports.deleteproduct=async(req,res)=>{
try {
    console.log('Received ID:', req.params.id); // 👈 This should show in terminal
    const { id } = req.params;

    // Optional: check if id is defined
    if (!id) {
      return res.status(400).json({ error: 'No ID received in request params.' });
    }

    await Product.findByIdAndDelete(id);
    res.json({ success: true, message: 'Product deleted.' });
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).json({ error: 'Deletion failed.' });
  }
}
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, amount, description, imageUrl } = req.body;

    const updated = await Product.findByIdAndUpdate(
      id,
      { name, amount, description, imageUrl },
      { new: true }
    );

    console.log('i am updated',updated);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Update failed.' });
  }
};
exports.addbulkProduct = async (req, res) => {
  try {
    const { products } = req.body;

    // Validate input
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'No products found in request' });
    }

    const errors = [];
    const cleanProducts = [];

    for (let i = 0; i < products.length; i++) {
      const prod = products[i];
      if (!prod.name || !prod.amount) {
        errors.push(`Missing name/amount in product at index ${i}`);
        continue;
      }

      // Check if product with same name already exists
      const existing = await Product.findOne({ name: prod.name });
      if (existing) {
        errors.push(`Duplicate product name at index ${i}: "${prod.name}"`);
        continue;
      }

      cleanProducts.push(prod);
    }

    if (errors.length) {
      return res.status(422).json({ errors });
    }

    // Save only non-duplicates
    const savedProducts = await Product.insertMany(cleanProducts);
    console.log('Bulk upload:', savedProducts.length, 'products');

    res.status(200).json({ message: 'Bulk products added successfully' });

  } catch (err) {
    console.error('Bulk add error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// admin Dashboard.
 exports.getAllUsers=async(req,res)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
    console.log("Hello i am admin users",users);
    //res.status(200).json(users);
  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ message: "Server error" });
  }

}

exports.updateUserRole=async(req,res)=>{
  try {
    const { id } = req.params;
    const { role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Update failed.' });
  }
}
exports.deleteUser=async(req,res)=>{
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ success: true, message: 'User deleted.' });
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).json({ error: 'Deletion failed.' });
  }
}

// Add Admin user

exports.createUserByAdmin=async(req,res)=>{
  try { 
    console.log("checking",req.body);
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const newUser = new User({ name, email, password: hashedPassword, role });
    if (role === "admin") {
      
      newUser.isVerified = true; // ✅ Always verify admin users
    }
    else {
      newUser.isVerified = false; // ✅ Always verify admin users
    }   
    // Save the new user to the database
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Create user error:", err);
    res.status(500).json({ message: "Server error" });
  }

}
exports.getUser=async(req,res)=>{
  // getall userfrom data base
  try {
    const users = await User.find(); // Fetch all users
    console.log("Fetched users:", users); // Log the fetched users for debugging
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }



}

exports.addticket=async(req,res)=>{
  const ticket=req.body;
  
}

exports.getProductsPaginated=async(req,res)=>{
   const { search = "", page = 1, limit = 8 } = req.query; // ✅ default 8

  const query = search
    ? { name: { $regex: search, $options: "i" } }
    : {};

  const skip = (page - 1) * limit;

  const products = await Product.find(query)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Product.countDocuments(query);

  res.json({
    products,
    totalPages: Math.ceil(total / limit),
    currentPage: parseInt(page),
  });


}





