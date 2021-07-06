const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    orderItems:[{
        type:mongoose.Types.ObjectId,
        ref:'OrderItem',
        required:true
    }],
    shippingAddress:{
        localAddress:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        zipCode:{
            type:Number,
            required:true
        }
    },
    phone:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'OrderItem',
        required:true
    }
});

module.exports = mongoose.model('Order', orderSchema);
