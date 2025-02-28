const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

const WHATSAPP_API_URL = `https://graph.facebook.com/v17.0/${process.env.PHONE_NUMBER_ID}/messages`;

router.post("/send-whatsapp-message", async (req, res) => {
    const { phone, message } = req.body;

    if (!phone || !message) {
        return res.status(400).json({ error: "Phone number and message are required" });
    }

    try {
        const response = await axios.post(
            WHATSAPP_API_URL,
            {
                messaging_product: "whatsapp",
                to: phone,
                type: "template",
                template: {
                    name: "appointment_confirmation", 
                    language: { code: "en_US" }, 
                    components: [
                        {
                            type: "body",
                            parameters: [
                                { type: "text", text: message },
                            ],
                        },
                    ],
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return res.status(200).json({ message: "WhatsApp message sent successfully", data: response.data });
    } catch (error) {
        console.error("Error sending WhatsApp message:", error.response?.data || error.message);
        return res.status(500).json({ error: "Failed to send WhatsApp message" });
    }
});

module.exports = router;
