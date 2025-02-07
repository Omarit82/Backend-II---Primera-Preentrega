export const authorization = (rol) => {
    return async (req,res,next) => {
        if(!req.user) return res.status(401).send({message:"NO AUTENTICADO"})
        if(req.user.user.rol != rol) return res.status(403).send({message:"NO AUTORIZADO"})
        next()
    }
}