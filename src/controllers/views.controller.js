import productsModel from "../models/products.model.js";
import cartsModel from "../models/carts.model.js";
import __dirname from '../path.js';

export const viewHome = async (req, res) =>{
    try {
        const { limit,page,metFilter,filter,metOrder, order} = req.query;
        const pag = page !== undefined ? page:1;
        const lim = limit ? parseInt(limit, 10) : 10
        const filQuery = metFilter !== undefined ? {[metFilter]:filter}:{};
        const ordQuery = metOrder ? {[metOrder]: order} : {};
        const products = await productsModel.paginate(filQuery, {
            limit: lim,
            page: pag,
            sort: ordQuery,
            lean: true
        });
        products.pageNumbers = Array.from({length: products.totalPages}, (_, i) => ({
            number: i + 1,
            isCurrent: i + 1 === products.page
        }))
        let user;
        if(req.user){
            user= JSON.parse(JSON.stringify(req.user))
        }
        res.status(200).render('templates/home',{js:'home.js',user:user,products:products,css:'styles.css'})
    } catch (error) {
        res.status(500).render('templates/error',{css:'styles.css',error:e})
    }
    
}

export const viewNewProduct =  (req,res) => {
    try {
        const user = JSON.parse(JSON.stringify(req.user))
        res.status(200).render('templates/loadproduct',{user:user,css:'styles.css',js:'newproduct.js'})
    } catch (error) {
        res.status(500).render('templates/error',{css:'styles.css',error:e})
    }
    
}

export const viewLogin =  (req,res) => {
    try {
        res.status(200).render('templates/login',{css:'styles.css',js:'login.js'})
    } catch (error) {
        res.status(500).render('templates/error',{css:'styles.css',error:e})
    }
    
}

export const viewRegister =  (req,res) => {
    try {
        res.status(200).render('templates/register',{css:'styles.css',js:'register.js'})
    } catch (error) {
        res.status(500).render('templates/error',{css:'styles.css',error:e})
    }
}

export const viewProduct = async (req,res) => {
    try {
        const id = req.params.id;
        const prod = await productsModel.findById(id).lean();
        if(prod){
            const user = JSON.parse(JSON.stringify(req.user))
            res.status(200).render('templates/product',{user:user,product:prod,css:'styles.css',js:'addToCart.js'})
        }else{
            res.status(404).send({message:`Product with id: ${id} not found`})
        }
    } catch (e) {
        res.status(500).render('templates/error',{css:'styles.css',error:e})
    }
}

export const viewCheckout = async (req,res) =>{ 
    try {
        const user = JSON.parse(JSON.stringify(req.user))
        const cart = await cartsModel.findById(req.user.cart).lean();
        res.status(200).render('templates/checkout',{user:user,cart:cart.products,js:'checkOut.js',css:'styles.css'})
    } catch (error) {
        res.status(500).render('templates/error',{css:'styles.css',error:error})
    }
}