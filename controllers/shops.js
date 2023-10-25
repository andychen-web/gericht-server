import { Shop, City } from "../models/Shop.js";

// CREATE
export const createShop = async (req, res) => {
  const newShop = new Shop(req.body);
  try {
    const savedShop = await newShop.save();
    res.status(201).json({ shop: savedShop });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const addShop = async (req, res) => {
  const { district, shop } = req.body;
  try {
    await Shop.updateOne({ district }, { $push: { shops: shop } });
    res.json({ message: "Shop added successfully" });
  } catch {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
};
// GET ALL
export const getShops = async (req, res) => {
  try {
    const shopsInfo = await Shop.find({}, { _id: 0 });
    const cityToDistricts = await City.find({}, { _id: 0 });
    res.status(200).json({ shopsInfo, cityToDistricts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
