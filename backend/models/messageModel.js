const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    phone: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: "pending" }, // pending, sent, failed
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
