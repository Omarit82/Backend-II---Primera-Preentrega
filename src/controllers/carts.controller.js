import cartModel from "../models/carts.model.js";
import productsModel from "../models/products.model.js";
import {ticketModel} from "../models/ticket.js";

export const getCart = async (req,res) => {
    try{
        const cid = req.params.cid;
        const response = cartModel.findById(cid);
        if(response){
            res.status(200).send({message:"Cart found: ",cart:response})
        }else{
            res.status(404).send({message:"Cart not found"})
        }
    }catch(e){
        res.status(500).send({message:"Error connecting db",error:e})
    }
}

export const createCart = async(req,res) =>{
    try {
        const resp = await cartModel.create({products:[]});
        res.status(201).send({message:"Cart created ok",cart:resp});
    } catch (error) {
        res.status(500).send({message:"Cannot create cart", error:error});
    }
}

export const insertProductCart = async (req,res) =>{
    try {
        const cartID = req.params.cid;
        const prodID = req.params.pid;
        const  { quantity } = req.body;
        const cart = await cartModel.findOne({_id:cartID});
        if(cart) {
            const index = cart.products.findIndex(prod => prod._id == prodID);
            if(index != -1){
                cart.products[index].quantity += quantity;
                await cartModel.findByIdAndUpdate(cartID,cart)
            }else{
                cart.products.push({id_prod:prodID, quantity:quantity})
            }
            const resp = await cartModel.findByIdAndUpdate(cartID,cart)
            res.status(200).send({message:"Cart updated"})
        }else{
            res.status(404).send({message:"Cart not found"})
        }
    } catch (error) {
        res.status(500).send({message:"Cannot insert product",error:error})
    }
}
export const updateProductCart = async (req,res) => {
    try {
        const cid = req.params.cid;
        const { newProduct } = req.body;
        const cart = await cartModel.findOne({_id:cid});
        cart.products = newProduct
        cart.save();
        res.status(200).send({message:"Product updated", cart:cart})
    } catch (error) {
        res.status(500).send({message:"Cannot update product on cart",error:error})
    }
}

export const updateQuantityProductCart = async(req,res) => {
    try {
        const cartID = req.params.cid;
        const prodID = req.params.pid;
        const  { quantity } = req.body;
        const cart = await cartModel.findOne({_id:cartID});
        if(cart) {
            const index = cart.products.findIndex(prod => prod._id == prodID);
            if(index != -1){
                cart.products[index].quantity = quantity;
                cart.save();
                res.status(200).send({message:"Quantity updated!", cart:cart})
            }else{
                res.status(404).send({message:"Product not found", product:prodID})
            }
            const resp = await cartModel.findByIdAndUpdate(cartID,cart)
            res.status(200).send({message:"Cart updated"})
        }else{
            res.status(404).send({message:"Cart not found"})
        }
    } catch (error) {
        res.status(500).send({message:"Cannot update product",error:error})
    }
}
export const deleteProductCart = async (req,res) => {
    try {
        const cartID = req.params.cid;
        const prodID = req.params.pid;
        const cart = await cartModel.findOne({_id:cartID});
        if(cart) {
            const index = cart.products.findIndex(prod => prod._id == prodID);
            if(index != -1){
                cart.products.splice(index,1);
                cart.save();
                res.status(200).send({message:"product deleted!",cart:cart})
            }else{
                res.status(404).send({message:"Product not found"})
            }
        }else{
            res.status(404).send({message:"Cart not found"})
        }
    } catch (error) {
        res.status(500).send({message:"Cannot insert product",error:error})
    }
}

export const deleteCart = async(req,res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartModel.findById(cartId);
        if(cart){
            cart.products = [];
            cart.save();
            res.status(200).send({message:"Cart erased",cart:cart})
        }else{
            res.status(404).send({message:"Cannot erase cart: ",cart:cartId});
        }
    } catch (error) {
        res.status(500).send({message:"Cannot delete cart",error:error});
    }
}

export const checkout = async (req,res) =>{
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findById(cartId)
        const prodStockNull = []
        if(cart){
            for (const prod of cart.products){
                let product = await productsModel.findById(prod.id_prod)
                if(product.stock - prod.quantity < 0){
                    prodStockNull.push(product.id)
                }
            }
            if(prodStockNull.length === 0){
                let totalAmount = 0;
                for (const prod of cart.products){
                    const product = await productsModel.findById(prod.id_prod);
                    if(product){
                        product.stock = product.stock - prod.quantity
                        totalAmount += product.price * prod.quantity
                        await product.save() 
                    }   
                }
                const newTicket = await ticketModel.create({
                    code: crypto.randomUUID(),
                    purchaser: req.user.email,
                    amount: totalAmount,
                    products: cart.products
                })
                await cartModel.findByIdAndUpdate(cartId,{products:[]})
                res.status(200).send({message:"ticket created",ticket:newTicket})
            }else{
                //Remuevo los prod sin stock
                prodStockNull.forEach((prodId) => {
                    cart.products = cart.products.filter( pro => pro.id_prod !== prodId)
                })
                await cartModel.findByIdAndUpdate(cartId, {
                    products: cart.products
                })
                res.status(400).send({message:"Stock null on products: ",products:prodStockNull})
            }
        }
    } catch (error) {
        res.status(500).send({message:"Cannot checkout",error:error});
    }
}