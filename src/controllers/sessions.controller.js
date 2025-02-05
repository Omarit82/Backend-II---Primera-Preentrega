

export const login = async(req,res)=>{
    try {
        if(!req.user){
            return res.status(401).send({message:"Usuario o contraseña incorrectos"})
        }
        return res.status(200).send({message:"login exitoso"})
    } catch (error) {
        res.status(500).send({message:"Error en la comunicacion con la db", error:error})
    }
}
export const register = async(req, res) => {
    try {
        if(!req.user){
            return res.status(400).send({message:"El mail ya se encuentra registrado"})
        }
        return res.status(201).send({message:"User created ok"})
    } catch (error) {
        res.status(500).send({message:"Error en comunicacion con db",error:error})
    }
}