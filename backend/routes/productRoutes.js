const express = require("express");
const Brand = require("../models/Brands"); // ✅ Corrected Model Reference
const router = express.Router();
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

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
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Brand ID" });
    }

    let brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    brand.name = req.body.name;
    if (req.file) {
      brand.image = `/uploads/${req.file.filename}`;
    }

    await brand.save();
    res.json(brand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating brand" });
  }
});




router.put("/api/edit-product/:productId", upload.single("image"), async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const brand = await Brand.findOne({ "products._id": mongoose.Types.ObjectId(productId) });

    if (!brand) return res.status(404).json({ message: "Product not found in any brand" });

    const productIndex = brand.products.findIndex((p) => p._id.toString() === productId);
    if (productIndex === -1) return res.status(404).json({ message: "Product not found" });

    // Update product fields
    if (req.body.name) brand.products[productIndex].name = req.body.name;
    if (req.body.price) brand.products[productIndex].price = req.body.price;
    if (req.body.discount) brand.products[productIndex].discount = req.body.discount;
    if (req.body.quantity) brand.products[productIndex].quantity = req.body.quantity;
    if (req.file) brand.products[productIndex].image = `/uploads/${req.file.filename}`;

    await brand.save();
    res.json({ message: "Product updated successfully", product: brand.products[productIndex] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product" });
  }
});



module.exports = router;
