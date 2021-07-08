const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    brandName:{
        type:String,
        default:''
    },
    description:{
        type:String,
        required:true
    },
    moreDescription:{
        type:String,
        default:''
    },
    image:{
        type:String,
        default:''
    },
    images:[{
        type:String
    }],
    price:{
        type:Number,
        required:true
    },
    stockCount:{
        type:Number,
        required:true,
        min:0,
        max:1000
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'Category',
        required:true
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    dateCreated:{
        type:Date,
        default:Date.now
    },
    rating:{
        type:Number,
        default:0
    }
});

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON',{
   virtuals:true 
});
module.exports = mongoose.model('Product', productSchema);
