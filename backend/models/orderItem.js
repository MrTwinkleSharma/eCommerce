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

//Creating Virtual 'id' 
orderItemSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

//Enabling serialization(converting string to objects) of virtual fields
orderItemSchema.set('toJSON',{
   virtuals:true 
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
