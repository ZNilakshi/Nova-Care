const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const doctorRoutes = require("./routes/doctorRoutes");
const productRoutes = require("./routes/productRoutes");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const orderRoutes = require("./routes/orderRoutes");
const path = require("path");

const whatsappRoutes = require("./routes/whatsapp");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json({ limit: "10mb" })); // Increase JSON payload size
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Increase URL-encoded payload size
app.use("/uploads", express.static("uploads"));

// Routes

app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api", require("./routes/productRoutes"));
// Routes
const appointmentRoutes = require("./routes/appointments");
app.use("/api/appointments", appointmentRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api", whatsappRoutes);


app.post("/create-payment-intent", async (req, res) => {
  try {
      const { amount } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
          amount: amount * 100, // Convert to cents
          currency: "usd",
          payment_method_types: ["card"], // ✅ Allow ONLY card payments
      });

      res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});



const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Handle port conflict error
server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use. Trying a different port...`);
      
      // Find an available port
      const newServer = app.listen(0, () => {
        console.log(`New server running on port ${newServer.address().port}`);
      });
    } else {
      console.error(err);
    }
  });