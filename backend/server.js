const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const doctorRoutes = require("./routes/doctorRoutes");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // Increase JSON payload size
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Increase URL-encoded payload size

// Routes
app.use("/api/doctors", doctorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
