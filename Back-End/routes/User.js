const express = require("express");
const router = express.Router();
const controller = require("../Controllers/AdminController");
const jobController = require("../Controllers/jobController");
const verifyToken = require("../middleware/verifyToken"); // 👈 Import middleware

// Public routes
router.post("/signup", controller.signupUser);
router.post("/verify-otp", controller.verifyOtp);
router.post("/login", controller.loginUser);
router.post("/forgot-password", controller.forgotPassword);
router.post("/reset-password", controller.resetPassword);
router.get("/getuser", verifyToken, controller.getUser); // Protected route example


// Protected routes
router.post("/add-team-member", verifyToken, controller.addTeamMember);
router.get("/team-members", controller.getTeamMembers);

router.get('/fetch',  jobController.fetchJobs);
router.get("/job", jobController.getJobs);

router.post("/add-product", verifyToken, controller.addProduct);
router.post("/add-products-bulk", verifyToken, controller.addbulkProduct);
router.get("/products",controller.getProducts);

router.delete("/:id", verifyToken, controller.deleteproduct);
router.put("/:id", verifyToken, controller.updateProduct);






// Admin Dashboard.

router.get('/admin/users',controller.getAllUsers);
//router.put('/users/:id', verifyToken,constroller.updateUserRole);
router.delete('/users/:id', verifyToken, controller.deleteUser);
router.post('/admin/addusers', verifyToken, controller.createUserByAdmin);


//Pagination and Search
router.get('/products-paginated',controller.getProductsPaginated);


// Add Ticket

router.post("/request-ticket",controller.addticket);


module.exports = router;