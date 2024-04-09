import express from "express";
import { addCategory, getAll, updateCategory } from "../controller/danhmuc";

const router = express.Router();

router.get("/category", getAll);
// router.get("/category/:id", getById);
router.put("/category/:id", updateCategory);
router.post("/category", addCategory);

export default router; 