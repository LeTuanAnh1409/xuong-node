import express from "express";
import { addToCart, getcartByUserId, removeProductFromCart } from "../controller/cart";
import { increaseProductQuantity, decreaseProductQuantity } from "../controller/cart";
const router = express.Router();
router.get("/cart/:userId", getcartByUserId);
router.post("/cart/addtocart", addToCart);
router.delete("/cart/:userId/:productId", removeProductFromCart);
router.put("/cart/:userId/increase/:productId", increaseProductQuantity);
router.put("/cart/:userId/decrease/:productId", decreaseProductQuantity);
export default router;
