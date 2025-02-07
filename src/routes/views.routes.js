import { Router } from "express";
import { authorization } from "../config/middlewares.js";
import { viewHome,viewNewProduct,viewProduct,viewLogin, viewRegister } from "../controllers/views.controller.js";
import passport from "passport";

const viewsRouter = Router();

viewsRouter.get('/',viewHome);
viewsRouter.get('/product/:id',viewProduct);
viewsRouter.get('/new-product',viewNewProduct)
viewsRouter.get('/login',viewLogin);
viewsRouter.get('/register',viewRegister);

export default viewsRouter;