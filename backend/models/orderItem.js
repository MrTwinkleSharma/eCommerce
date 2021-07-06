const mongoose = require('mongoose');


const orderItemSchema = mongoose.Schema({
    product:{
        type:mongoose.Types.ObjectId,
        ref:'Product',
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    }

});

module.exports = mongoose.model('OrderItem', orderItemSchema);
