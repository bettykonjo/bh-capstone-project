const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: { type:String, require: true},
    products: [
        {
            productId:{
                type:string,
            },
            quantity:{
                type:Number,
                default:1,
            },
        },
    ],
    amount: { type:String, require: true },
    adress: { type: object, require: true},
    status: { type: string, default: "pending"},
},
{ timestamps: true}
);

module.exports = mongoose.model("Order", OrderSchema);