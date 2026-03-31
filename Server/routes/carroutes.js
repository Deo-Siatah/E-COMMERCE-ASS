const express = require("express");
const router = express.Router();

const {createCar,getCars,updateCar,deleteCar,getCarById} = require("../controllers/carController")
const {protect} = require("../middleware/authMiddleware")

router.post("/cars", protect, createCar);
router.get("/cars/:id",getCarById);
router.get("/cars", getCars);
router.patch("/cars/:id",protect,updateCar);
router.delete("/cars/:id", protect, deleteCar);

module.exports = router;