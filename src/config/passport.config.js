import 'dotenv/config'
import passport from "passport"
import local from "passport-local";
import jwt, { ExtractJwt } from "passport-jwt";
import GithubStrategy from "passport-github2";
import { encriptar,desencriptar } from "../utils/bcrypt.js";
import userModel from "../models/users.model.js";


const localStrategy = local.Strategy
const JWTStrategy = jwt.Strategy;
const ExtractJWT = ExtractJwt;

const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies){
        token = req.cookies['coderCookie']
    }
    return token
}

export const passportCall = (strategy) => {
    return async(req,res,next) => {
        passport.authenticate(strategy,function(err,user, info){
            if (err)
                return next(err)
            if(!user){
                return res.status(401).send({error: info.messages?info.messages:info.toString()})
            }
            req.user =user
            next()
        } (req,res,next))
    }
}

const initializatePassport = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.SECRET_JWT,
    }, async(jwt_payload, done)=>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('register',new localStrategy({passReqToCallback:true,usernameField:'email'}, async(req,username,password,done) => {
        try {
            const {first_name, last_name,email,password,age} = req.body;
            const findUser = await userModel.findOne({email:email});
            if(!findUser){
                const newUser = {
                    first_name:first_name,
                    last_name:last_name,
                    email:email,
                    password:encriptar(password),
                    age:age
                }
                const newU = await userModel.create(newUser);
                return done(null,newU);
            }else{
                return done(null,false)
            }
           
        } catch (error) {
            return done(error)
        }
        

    }))
    passport.use('login',new localStrategy({usernameField:'email'},async (username, password,done) =>{
        try {
            const user = await userModel.findOne({email:username});
            if(user && desencriptar(password, user.password)){
                return done(null, user)
            }
            return done(null, false)
        } catch (error) {
            return done(error,false)
        }
    }))
    passport.use('github',new GithubStrategy({
        clientID:"Iv23litqAUVWDwraaDwo",
        clientSecret:process.env.SECRET_GITHUB,
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    },async(accessToken,refreshToken,profile,done)=>{
        try {
            let user = await userModel.findOne({email: profile._json.email})
            if(!user){
                const user = await userModel.create({
                    first_name:profile._json.name,
                    last_name:" ", // Dato no proporcionado
                    email:profile._json.email,
                    password:'1234', //Dato no proporcionado
                    age:18 //Dato no proporcionado
                })
                done(null,user)
            }else{
                done(null, user)
            }
        } catch (error) {
            return done(e)
        }
    }))

    passport.serializeUser((user,done)=>{
        if(user?._id){
            done(null,user._id)
        }else{
            done(null,user.user._id)
        }
    
    })

    passport.deserializeUser(async(id,done)=>{
        const user = await userModel.findById(id);
        done(null, user);
    })
}

export default initializatePassport