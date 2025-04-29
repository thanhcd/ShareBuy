const express = require("express");
const stripe_key = process.env.EXPO_PUBLIC_STRIPE_SECRET_KEY;
const stripe = require("stripe")(
  stripe_key
); // Replace with your Secret Key
const app = express();

app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  console.log("Received request:", req.body); // Log để kiểm tra
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
    });

    console.log("PaymentIntent created:", paymentIntent); // Log để kiểm tra
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error); // Log lỗi
    res.status(500).send({ error: error.message });
  }
});
app.listen(3000, () => console.log("Server running on port 3000"));
