import { Schema,model } from "mongoose";
import cartModel from "./carts.model.js";

const userShema = new Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        require:true
    },
    password: {
        type:String,
        required:true
    },
    rol: {
        type:String,
        default:"User"
    },
    cart:{
        type: Schema.Types.ObjectId,
        ref:"carts"
    }
})
userShema.post("save",async(doc)=>{
    try {
        if(!doc.cart){
            const newCart = await cartModel.create({products:[]})
            await model("users").findByIdAndUpdate(doc._id,{cart:newCart._id});
        }
    } catch (error) {
        console.log("Error creating cart",error)
    }
})

const userModel = model('users',userShema);

export default userModel;