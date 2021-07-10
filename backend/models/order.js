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
        required:true,
        ref:'User',
    },
    status:{
        type:String,
        required:true,
        default:"Pending"
    }
});

//Creating Virtual 'id' 
orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

//Enabling serialization(converting string to objects) of virtual fields
orderSchema.set('toJSON',{
   virtuals:true 
});


module.exports = mongoose.model('Order', orderSchema);
