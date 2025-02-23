import { Router } from "express";
import productsRouter from "./products.routes.js";
import sessionRouter from "./session.routes.js";
import cartRouter from "./carts.routes.js";
import viewsRouter from "./views.routes.js"

const indexRouter = Router();

indexRouter.use('/api/sessions',sessionRouter)
indexRouter.use('/api/products',productsRouter)
indexRouter.use('/api/carts',cartRouter)
indexRouter.use('/',viewsRouter)

export default indexRouter