import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/products.controller.js";
import { Router } from "express";

const productsRouter = Router();

productsRouter.post('/',createProduct);
productsRouter.get('/',getProducts);
productsRouter.get('/:id',getProduct);
productsRouter.put('/:id',updateProduct);
productsRouter.delete('/:id',deleteProduct);

export default productsRouter