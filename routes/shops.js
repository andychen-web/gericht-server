import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createShop, getShops, addShop } from "../controllers/shops.js";

const router = express.Router();
// READ
router.get("/", getShops);
// CREATE
router.post("/create", verifyToken, createShop);
router.post("/add", verifyToken, addShop);
export default router;
