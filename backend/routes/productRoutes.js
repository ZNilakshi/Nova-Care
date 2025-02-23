const express = require("express");
const Brand = require("../models/Brands"); // ✅ Corrected Model Reference
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Multer for Image Upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ Add Brand Route
router.post("/add-brand", upload.single("image"), async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newBrand = new Brand({ name, image, products: [] });
    await newBrand.save();
    res.json(newBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get All Brands
router.get("/brands", async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Add Product to a Brand
router.post("/add-product/:brandId", upload.single("image"), async (req, res) => {
  try {
    const { name, price, discount, quantity } = req.body;
    const brand = await Brand.findById(req.params.brandId);
    if (!brand) return res.status(404).json({ message: "Brand not found" });

    const image = req.file ? `/uploads/${req.file.filename}` : null;
    brand.products.push({ name, price, discount, image, quantity });
    await brand.save();
    res.json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
