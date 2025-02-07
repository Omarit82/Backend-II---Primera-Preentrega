import jwt from "jsonwebtoken";

let secretKey = "codercoder";

export const generateToken = (user) =>{
    const token = jwt.sign({user},secretKey,{expiresIn:'24h'});
    return token;
}