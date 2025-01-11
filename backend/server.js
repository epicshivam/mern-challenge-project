// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// MongoDB connection
const mongoURI = "mongodb+srv://shivam:SDI3D3AKdcfe3DXS@cluster0.pevth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define schema and model
const transactionSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  dateOfSale: Date,
  category: String,
  sold: Boolean,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

// Initialize database with seed data
app.get("/api/init", async (req, res) => {
  try {
    const response = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
    await Transaction.deleteMany();
    await Transaction.insertMany(response.data);
    res.status(200).send("Database initialized successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error initializing database.");
  }
});

// API Endpoints
app.get("/api/statistics", async (req, res) => {
  const { month } = req.query;
  try {
    const stats = await Transaction.aggregate([
      {
        $project: {
          month: { $month: "$dateOfSale" },
          price: 1,
          sold: 1,
        },
      },
      { $match: { month: parseInt(month) } },
      {
        $group: {
          _id: null,
          totalSales: { $sum: { $cond: ["$sold", "$price", 0] } },
          soldItems: { $sum: { $cond: ["$sold", 1, 0] } },
          unsoldItems: { $sum: { $cond: ["$sold", 0, 1] } },
        },
      },
    ]);
    res.json(stats[0] || { totalSales: 0, soldItems: 0, unsoldItems: 0 });
  } catch (error) {
    res.status(500).send("Error fetching statistics.");
  }
});

app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).send("Error fetching transactions.");
  }
});

app.get("/api/transactions/bar-data", async (req, res) => {
  try {
    const barData = await Transaction.aggregate([
      {
        $group: {
          _id: "$category",
          totalSales: { $sum: "$price" },
        },
      },
    ]);
    const labels = barData.map((data) => data._id);
    const data = barData.map((data) => data.totalSales);
    res.json({ labels, datasets: [{ label: "Sales by Category", data }] });
  } catch (error) {
    res.status(500).send("Error fetching bar chart data.");
  }
});

app.get("/api/transactions/pie-data", async (req, res) => {
  try {
    const soldCount = await Transaction.countDocuments({ sold: true });
    const unsoldCount = await Transaction.countDocuments({ sold: false });
    res.json({
      labels: ["Sold", "Unsold"],
      data: [soldCount, unsoldCount],
    });
  } catch (error) {
    res.status(500).send("Error fetching pie chart data.");
  }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
