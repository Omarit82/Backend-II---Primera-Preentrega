import { Router } from "express";
import passport from "passport";
import { login,register, githubLogin, logout } from "../controllers/sessions.controller.js";


const sessionRouter = Router();

sessionRouter.post('/login', passport.authenticate('login'), login);
sessionRouter.post('/register',passport.authenticate('register'),register);
sessionRouter.get('/github',passport.authenticate('github',{scope:['user:email']}), async (req,res) => {});
sessionRouter.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/login'}),githubLogin)
sessionRouter.get('/current',passport.authenticate('jwt'), (req,res)=> res.send(req.user)) /*passportCall('jwt')*/
sessionRouter.get('/logout',logout);


export default sessionRouter;