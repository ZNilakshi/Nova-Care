const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Save order to database
router.post("/create-order", async (req, res) => {
  try {
    const { name, email, address, phone, items, totalAmount } = req.body;
    
    const newOrder = new Order({ name, email, address, phone, items, totalAmount, paymentStatus: "Paid" });
    await newOrder.save();

    res.status(201).json({ success: true, message: "Order saved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});

module.exports = router;
