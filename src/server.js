import express from 'express';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import initializatePassport from './config/passport.config.js';
import sessionRouter from './routes/session.routes.js';
import productsRouter from './routes/products.routes.js';
import cartRouter from './routes/carts.routes.js';
import __dirname from './path.js';


const app = express();
const PORT = 8080;
initializatePassport();

app.use(express.json());
app.use(cookieParser("SecretCode")) /**Para utilizar cookies */
app.use(session({
    store:MongoStore.create({
        mongoUrl:"mongodb+srv://roselliomar82:piperpa11@disqueria.ngm69.mongodb.net/?retryWrites=true&w=majority&appName=disqueria",
        ttl:15
    }),
    secret:'SecretCode',
    resave:true, /***Permite mantener la session activa. En false la session muere luego de cierto tiempo */
    saveUninitialized:true /***Permite guardar una session aunque no contenga nada */
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/products',productsRouter);
app.use('/api/carts',cartRouter);
app.use('/api/sessions',sessionRouter);

/** Vinculo a la db */
mongoose.connect('mongodb+srv://roselliomar82:piperpa11@disqueria.ngm69.mongodb.net/?retryWrites=true&w=majority&appName=disqueria')
.then(()=>{
    console.log("DB connected");
}).catch(() => {
    console.log("DB Connection error!");
})

app.listen(PORT,()=>{
    console.log('Server on PORT: ',PORT);
})



