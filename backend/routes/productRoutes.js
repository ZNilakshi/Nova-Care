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
      console.log("Request Body:", req.body);
      console.log("Uploaded File:", req.file);

      const { name } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;

      if (!name || !image) {
          return res.status(400).json({ message: "All fields are required" });
      }

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
router.put("api/update-product/:brandId/:productId", upload.single("image"), async (req, res) => {
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


router.delete("/api/delete-brand/:id", async (req, res) => {
  console.log("Deleting brand with ID:", req.params.id);

  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      console.log("Brand not found in database");
      return res.status(404).json({ message: "Brand not found" });
    }
    res.json({ message: "Brand deleted successfully" });
  } catch (error) {
    console.error("Error deleting brand:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.delete("/api/delete-product/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  try {
    const brand = await Brand.findOneAndUpdate(
      { "products._id": req.params.id }, // Find the brand containing this product
      { $pull: { products: { _id: req.params.id } } }, // Remove the product
      { new: true }
    );

    if (!brand) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully", brand });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



router.put("/api/edit-product/:productId", upload.single("image"), async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const brand = await Brand.findOne({ "products._id": new mongoose.Types.ObjectId(productId) });

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









module.exports = router;
