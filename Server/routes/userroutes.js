const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware")
const {getUserProfile,updateUserProfile} = require("../controllers/userController")

router.get('/users/:id',protect,getUserProfile);
router.patch('/users/:id',protect,updateUserProfile);

module.exports = router;