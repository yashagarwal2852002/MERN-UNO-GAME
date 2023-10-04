const express = require('express');
const {registerUser, authUser, allUsers} = require('../Controllers/userController.js');

const {protect} = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);

module.exports = router;
