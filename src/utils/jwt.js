import jwt from "jsonwebtoken";
import 'dotenv/config';

let secretKey = process.env.SECRET_JWT;

export const generateToken = (user) =>{
    const token = jwt.sign({user},secretKey,{expiresIn:'24h'});
    return token;
}