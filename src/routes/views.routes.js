import { Router } from "express";
import { authorization } from "../config/middlewares.js";
import { viewHome,viewNewProduct,viewProduct,viewLogin, viewRegister, viewCheckout, viewAdministrate,viewTickets} from "../controllers/views.controller.js";

const viewsRouter = Router();

viewsRouter.get('/',viewHome);
viewsRouter.get('/product/:id',authorization('User'),viewProduct);
viewsRouter.get('/new-product',authorization('Admin'),viewNewProduct);
viewsRouter.get('/login',viewLogin);
viewsRouter.get('/register',viewRegister);
viewsRouter.get('/checkout',authorization('User'),viewCheckout);
viewsRouter.get('/administrate',authorization('Admin'),viewAdministrate)
viewsRouter.get('/view-tickets',authorization('Admin'),viewTickets)

export default viewsRouter;