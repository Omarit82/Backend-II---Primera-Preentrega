import passport from "passport"
import local from "passport-local";
import GithubStrategy from "passport-github2";
import { encriptar,desencriptar } from "../utils/bcrypt.js";
import userModel from "../models/sessions.model.js";

const localStrategy = local.Strategy

const initializatePassport = () => {
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
            return done(e)
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
        clientSecret:"",
        callbackURL: ""
    },async(accessToken,refreshToken,profile,done)=>{
        try {
            console.log(profile);
            console.log(accessToken);
            console.log(refreshToken);
            let user = await userModel.findOne({email: profile._json.email})
            if(!user){
                let newUser = {

                }
                done(null,true)
            }else{
                done(null, user)
            }
        } catch (error) {
            return done(e)
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })

    passport.deserializeUser(async(id,done)=>{
        const user = await userModel.findById(id);
        done(null, user);
    })
}

export default initializatePassport