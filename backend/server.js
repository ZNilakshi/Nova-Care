const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const doctorRoutes = require("./routes/doctorRoutes");
const productRoutes = require("./routes/productRoutes");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const orderRoutes = require("./routes/orderRoutes");
const path = require("path");


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
app.post("/api/send-sms", async (req, res) => {
  const { phone, message } = req.body;

  if (!phone || !message) {
    return res.status(400).json({ error: "Phone number and message are required." });
  }

  try {
    const response = await axios.post("https://app.notify.lk/api/v1/send", null, {
      params: {
        user_id: process.env.NOTIFY_USER_ID,
        api_key: process.env.NOTIFY_API_KEY,
        sender_id: process.env.NOTIFY_SENDER_ID,
        to: phone,
        message: message,
      },
    });

    console.log("Notify.lk response:", response.data);

    if (response.data.status === "success") {
      res.json({ success: true, message: "SMS sent successfully!" });
    } else {
      res.status(400).json({ success: false, error: response.data.message });
    }
  } catch (error) {
    console.error("Notify.lk API error:", error.message);
    res.status(500).json({ success: false, error: "Failed to send SMS." });
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