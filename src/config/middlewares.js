export const authorization = (rol) => {
    return async (req,res,next) => {
        if(!req.user) return res.status(401).redirect('/login');
        if(req.user.rol == 'Admin'){
            return next();
        }
        if(req.user.rol != rol) return res.status(403).send({message:"NO AUTORIZADO"})
        next();
    }
}