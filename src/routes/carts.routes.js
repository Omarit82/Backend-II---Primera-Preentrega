import { Router } from "express";
import { getCart,createCart,updateProductCart,updateQuantityProductCart,deleteCart,deleteProductCart,insertProductCart,checkout } from "../controllers/carts.controller.js";
import { authorization } from "../config/middlewares.js";

const cartRouter = Router();

cartRouter.get('/:cid',getCart);
cartRouter.post('/',authorization("User"),createCart);
cartRouter.post('/:cid/products/:pid',authorization("User"),insertProductCart);
cartRouter.put('/:cid/products/:pid',authorization("User"), updateQuantityProductCart);
cartRouter.put('/:cid',authorization("User"),updateProductCart);
cartRouter.delete('/:cid',authorization("User"),deleteCart);
cartRouter.delete('/:cid/products/:pid',authorization("User"),deleteProductCart);
cartRouter.post('/:cid/checkout',authorization("User"),checkout)

export default cartRouter; 