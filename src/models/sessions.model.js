import { Schema,model } from "mongoose";

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
    }
})

const userModel = model('users',userShema);

export default userModel;