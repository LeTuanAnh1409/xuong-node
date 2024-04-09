import express from "express";
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controller/product";

const router = express.Router();

router.get("/products", getProducts);

router.get("/products/:id", getProductById);

router.post("/products", addProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;
