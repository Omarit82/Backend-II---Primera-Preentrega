import { Router } from "express";
import { viewHome,viewNewProduct,viewProduct,viewLogin, viewRegister } from "../controllers/views.controller.js";
const viewsRouter = Router();

viewsRouter.get('/',viewHome);
viewsRouter.get('/product/:id',viewProduct);
viewsRouter.get('/new-product',viewNewProduct)
viewsRouter.get('/login',viewLogin);
viewsRouter.get('/register',viewRegister);

export default viewsRouter;