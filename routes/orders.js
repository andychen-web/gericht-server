import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createOrder,
  getOrders,
  deleteOrder,
  updateOrder,
  getOrder,
} from "../controllers/orders.js";

const router = express.Router();
// create
router.post("/order", verifyToken, createOrder);
// read
router.get("/", verifyToken, getOrders);
router.get("/:id", verifyToken, getOrder);

// delete
router.delete("/:orderId", verifyToken, deleteOrder);
router.patch("/:orderId", verifyToken, updateOrder);
export default router;
