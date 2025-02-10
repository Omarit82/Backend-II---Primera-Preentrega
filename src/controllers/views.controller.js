import productsModel from "../models/products.model.js"

export const viewHome = async (req, res) =>{
    const { limit,page,metFilter,filter,metOrder, order} = req.query;
    const pag = page !== undefined ? page:1;
    const lim = limit !== undefined || limit !== null ? limit:10;
    const filQuery = metFilter !== undefined ? {[metFilter]:filter}:{};
    const ordQuery = metOrder !== undefined ? {metOrder: order}:{};
    const products = await productsModel.paginate(filQuery,{limit:lim,page:pag,ordQuery,lean:true});
    products.pageNumbers = Array.from({length: products.totalPages}, (_, i) => ({
        number: i + 1,
        isCurrent: i + 1 === products.page
    }))
    const user = JSON.parse(JSON.stringify(req.user))
    res.status(200).render('templates/home',{user:user,products:products,css:'styles.css'})
}

export const viewLogout = async (req,res) =>{ 
    req.session.destroy ( error => {
        if(error) {
            return res.status(500).send("Unable to close session");
        }
        res.status(200).redirect('/login')
    })    
}

export const viewNewProduct =  (req,res) => {
    res.status(200).render('templates/loadproduct',{css:'styles.css',js:'newproduct.js'})
}

export const viewLogin =  (req,res) => {
    res.status(200).render('templates/login',{css:'styles.css',js:'login.js'})
}

export const viewRegister =  (req,res) => {
    res.status(200).render('templates/register',{css:'styles.css',js:'register.js'})
}

export const viewProduct = async (req,res) => {
    try {
        const id = req.params.id;
        const prod = await productsModel.findById(id).lean();
        if(prod){
            res.status(200).render('templates/product',{product:prod,css:'styles.css',js:'addToCart.js'})
        }else{
            res.status(404).send({message:`Product with id: ${id} not found`})
        }
    } catch (e) {
        res.status(500).send({message:"Error trying to adquire product",error:e})
    }
}