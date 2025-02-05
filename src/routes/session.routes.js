import { Router } from "express";
import passport from "passport";
import { login,register } from "../controllers/sessions.controller.js";

const sessionRouter = Router();

sessionRouter.post('/login', passport.authenticate('login'), login);
sessionRouter.post('/register',passport.authenticate('register'),register);

export default sessionRouter;