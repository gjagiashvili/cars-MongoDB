import express from "express";
import { connectDB } from "./services/database.js";
import { Car } from "./models/carModel.js";

const app = express();
const port = 3000;

connectDB();

app.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error("Error getting cars:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/cars/:carId", async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    console.error("Error getting car:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/cars", async (req, res) => {
  try {
    const car = { id: car.length + 1, post };
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/cars/:carId", async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.carId, req.body, {
      new: true,
    });
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/cars/:carId", async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.carId);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
