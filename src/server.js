import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import { engine } from 'express-handlebars';
import initializatePassport from './config/passport.config.js';
import __dirname from './path.js';
import cors from 'cors';
import indexRouter from './routes/index.routes.js';

dotenv.config()
const app = express();
const PORT = 8080;
initializatePassport();
app.engine('handlebars',engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');
app.use('/public',express.static(__dirname+'/public'));
app.use(cors())
app.use(express.json());
app.use(cookieParser(process.env.SECRET_COOKIE)) /**Para utilizar cookies */
app.use(session({
    store:MongoStore.create({
        mongoUrl:"mongodb+srv://roselliomar82:piperpa11@disqueria.ngm69.mongodb.net/?retryWrites\=true&w\=majority&appName\=disqueria",
        ttl:60*60*24
    }),
    secret:process.env.SECRET_SESSION,
    resave:true, /***Permite mantener la session activa. En false la session muere luego de cierto tiempo */
    saveUninitialized:true /***Permite guardar una session aunque no contenga nada */
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/',indexRouter);

/** Vinculo a la db */
mongoose.connect(process.env.URL_MONGO)
.then(()=>{
    console.log("DB connected");
}).catch((error) => {
    console.error("❌ DB Connection error:", error);
});

app.listen(PORT,()=>{
    console.log('Server on PORT: ',PORT);
})



