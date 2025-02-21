import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique:true
    },
    purchase_datatime: {
        type: Date,
        default: Date.now
    },
    purchaser: {
        type: String,
        required: true
    },
    products:{
        type: Object
    }
})

export const ticketModel = model("ticket",ticketSchema);