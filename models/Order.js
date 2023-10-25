import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    cartItems: {
      type: Array,
      required: true,
      trim: true,
    },
    deliveryLocation: {
      type: String,
      required: false,
      trim: true,
    },
    takeoutInfo: {
      type: Object,
      required: false,
      trim: true,
    },
    orderStatus: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: false,
      trim: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    pickupTime: {
      type: String,
      required: true,
      trim: true,
    },
    total: { type: Number, required: true, trim: true },
  },
  { versionKey: false }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
