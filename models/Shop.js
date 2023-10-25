import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
  district: {
    type: String,
    required: false,
  },
  shops: [
    {
      address: {
        type: String,
        required: true,
      },
      branch: {
        type: String,
        required: true,
      },
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
  ],
});

const CitySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  districts: { type: [String] },
});

const City = mongoose.model("City", CitySchema);
const Shop = mongoose.model("Shop", ShopSchema);
export { City, Shop };
