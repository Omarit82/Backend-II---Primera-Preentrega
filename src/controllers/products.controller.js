import productsModel from "../models/products.model.js";

export const createProduct = async (req,res) => {
    try {
        const data = req.body;
        /**Chequeo si el producto a crear es unico verificando el codigo. */
        const exists = await productsModel.findOne({code:data.code});
        if(exists){
            res.status(409).send({message:"Conflict! There's a product with the same code", code: data.code})
        }else{
            const prod = await productsModel.create(data);
            res.status(201).send({message:"Product created ok", product:prod})
        }
    } catch (error) {
        res.status(500).send({message:"Error, connection lost", error:error})
    }
}

export const getProducts = async (req,res) => {
    try {
        const { limit,page,metFilter,filter,metOrder, order} = req.query;
        const pag = page !== undefined ? page:1;
        const lim = limit !== undefined || limit !== null ? limit:10;
        const filQuery = metFilter !== undefined ? {[metFilter]:filter}:{};
        const ordQuery = metOrder !== undefined ? {metOrder: order}:{};

        const prods = await productsModel.paginate(filQuery,{limit:lim,page:pag,ordQuery});
        res.status(200).send({message:"All products:",prods:prods})
    } catch (error) {
        res.status(500).send({message:"Error, connection lost adquiring all products",error:error})
    }
}

export const getProduct = async(req,res) => {
    try {
        const id = req.params.id;
        const prod = await productsModel.findById(id);
        if(prod){
            res.status(200).send({message:"Product found: ",prod:prod})
        }else{
            res.status(404).send({message:`Product with id: ${id} not found`})
        }
    } catch (e) {
        res.status(500).send({message:"Error trying to adquire product",error:e})
    }
}

export const updateProduct = async(req,res) => {
    try {
        const id = req.params.id;
        const update = req.body;
        const prod = await productsModel.findByIdAndUpdate(id,update);
        res.status(200).send({message:"Product updated ok", updated:update})
    } catch (e) {
        res.status(500).send({message:"Error tryng to update product"})
    }
}

export const deleteProduct = async(req,res) =>{
    try {
        const id = req.params.id;
        const info = await productsModel.findByIdAndDelete(id);
        if(info){
            res.status(200).send({message:`Product with id: ${id} deleted successfully`})
        }else{
            res.status(404).send({message:`Product with id: ${id} not found`})
        }
    } catch (e) {
        res.status(500).send({message:"Error trying to delete product",error:e})
    }
}