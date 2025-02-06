import { Schema,model } from "mongoose";
import paginate from "mongoose-paginate-v2";


const productSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    autor:{
        type:String,
        required: true
    },
    year:{
        type:Number,
        required: true
    },
    genere: {
        type:String,
        required:true,
        index:true
    },
    status:{
        type:Boolean,
        default:true
    },
    code:{
        type:String,
        required: true,
        unique:true
    },
    price:{
        type:Number,
        required: true
    },
    stock:{
        type:Number,
        required: true
    },
    thumbnails:{
        dafault:[]
    }
});

productSchema.plugin(paginate)
const productsModel = model('products',productSchema);

export default productsModel;