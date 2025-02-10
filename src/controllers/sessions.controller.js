import { generateToken } from "../utils/jwt.js";

export const login = async(req,res)=>{
    try {
        const user = req.user;
        console.log(user);
        if(!req.user){
            return res.status(401).send({message:"Usuario o contraseña incorrectos"})
        }
        const token = generateToken(user);
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        }        
        res.cookie('coderCookie',token,{
            httpOnly:true,
            secure:false,
            maxAge:3600000
        });
        res.status(200).redirect('/')
    } catch (error) {
        res.status(500).send({message:"Error al loguear usuario", Error:error})
    }
}

export const register = async(req, res) => {
    try {
        if(!req.user){
            return res.status(400).send({message:"El mail ya se encuentra registrado"})
        }
        return res.status(201).send({message:"User created ok"})
    } catch (error) {
        res.status(500).send({message:"Error al registrar usuario",Error:error})
    }
}

export const githubLogin = (req,res) => {
    try {
        
        req.session.user = {
            email:req.user.email,
            first_name: req.user.first_name
        }
        return res.status(200).redirect("/")
    } catch (error) {
        res.status(500).send({message:"Error al loguear usuario", Error:error})
    }
}