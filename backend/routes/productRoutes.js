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

    // Check if brand exists
    const brand = await Brand.findById(req.params.brandId);
    if (!brand) return res.status(404).json({ message: "Brand not found" });

    // Debugging logs
    console.log("Received file:", req.file);
    console.log("Received data:", req.body);

    // Ensure image file is uploaded
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    // Add product to brand
    brand.products.push({ name, price, discount, image, quantity });
    await brand.save();

    res.status(201).json({ message: "Product added successfully", brand });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update Product
router.put("/update-product/:brandId/:productId", upload.single("image"), async (req, res) => {
  try {
    const { name, price, discount, quantity } = req.body;
    const { brandId, productId } = req.params;
    const brand = await Brand.findById(brandId);

    if (!brand) return res.status(404).json({ message: "Brand not found" });

    const productIndex = brand.products.findIndex((p) => p._id.toString() === productId);
    if (productIndex === -1) return res.status(404).json({ message: "Product not found" });

    const image = req.file ? `/uploads/${req.file.filename}` : brand.products[productIndex].image;

    // ✅ Update product details
    brand.products[productIndex] = {
      ...brand.products[productIndex]._doc, // Keep existing fields
      name,
      price,
      discount,
      quantity,
      image,
    };

    await brand.save();
    res.json(brand.products[productIndex]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete Product
router.delete("/delete-product/:brandId/:productId", async (req, res) => {
  try {
    const { brandId, productId } = req.params;
    const brand = await Brand.findById(brandId);

    if (!brand) return res.status(404).json({ message: "Brand not found" });

    // ✅ Remove product
    brand.products = brand.products.filter((product) => product._id.toString() !== productId);

    await brand.save();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.put("/api/edit-brand/:id", upload.single("image"), async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: "Brand not found" });

    brand.name = req.body.name;
    if (req.file) brand.image = `/uploads/${req.file.filename}`;

    await brand.save();
    res.json(brand);
  } catch (err) {
    res.status(500).json({ message: "Error updating brand" });
  }
});


router.put("/api/edit-product/:id", upload.single("image"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = req.body.name;
    product.price = req.body.price;
    product.discount = req.body.discount;
    product.quantity = req.body.quantity;
    if (req.file) product.image = `/uploads/${req.file.filename}`;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error updating product" });
  }
});

module.exports = router;
