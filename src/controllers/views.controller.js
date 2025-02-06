import productsModel from "../models/products.model.js"

export const viewHome = async (req, res) =>{
    const { limit,page,metFilter,filter,metOrder, order} = req.query;
    const pag = page !== undefined ? page:1;
    const lim = limit !== undefined || limit !== null ? limit:8;
    const filQuery = metFilter !== undefined ? {[metFilter]:filter}:{};
    const ordQuery = metOrder !== undefined ? {metOrder: order}:{};
    
    const products = await productsModel.paginate(filQuery,{limit:lim,page:pag,ordQuery,lean:true});
    products.pageNumbers = Array.from({length: products.totalPages}, (_, i) => ({
        number: i + 1,
        isCurrent: i + 1 === products.page
    }))
    console.log(products)
    res.status(200).render('templates/home',{products:products,css:'styles.css'})
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
    const session = req.session;
    const id = req.params.id;
    const product = await productModel.findById(id).lean();
    res.status(200).render('templates/product',{session:session,product:product,css:'styles.css',js:'addToCart.js'})
}