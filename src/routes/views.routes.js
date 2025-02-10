import { Router } from "express";
import { authorization } from "../config/middlewares.js";
import { viewHome,viewNewProduct,viewProduct,viewLogin, viewRegister,viewLogout } from "../controllers/views.controller.js";

const viewsRouter = Router();

viewsRouter.get('/',authorization('User'),viewHome);
viewsRouter.get('/product/:id',viewProduct);
viewsRouter.get('/new-product',authorization('Admin'),viewNewProduct)
viewsRouter.get('/login',viewLogin);
viewsRouter.get('/register',viewRegister);
viewsRouter.get('/logout',viewLogout)

export default viewsRouter;