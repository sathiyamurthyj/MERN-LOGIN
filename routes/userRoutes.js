const express = require("express");
const {registerUser, loginUser} = require("../controllers/userController");
// initialize router
const router = express.Router();

// define routes
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;