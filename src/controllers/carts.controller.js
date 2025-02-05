import cartModel from "../models/carts.model.js";

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
                cart.products[index].quantity = quantity;
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
        const cart = await cartModel.findByIdAndDelete(cartId);
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