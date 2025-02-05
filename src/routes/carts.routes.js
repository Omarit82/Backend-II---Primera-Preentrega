import { Router } from "express";
import { getCart,createCart,updateProductCart,updateQuantityProductCart,deleteCart,deleteProductCart,insertProductCart } from "../controllers/carts.controller.js";

const cartRouter = Router();

cartRouter.get('/:cid',getCart);
cartRouter.post('/',createCart);
cartRouter.post('/:cid/products/:pid',insertProductCart);
cartRouter.put('/:cid/products/:pid', updateQuantityProductCart);
cartRouter.put('/:cid',updateProductCart);
cartRouter.delete('/:cid',deleteCart);
cartRouter.delete('/:cid/products/:pid',deleteProductCart);

export default cartRouter; 