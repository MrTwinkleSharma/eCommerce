const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    address:{
        localAddress:{
            type:String
        },
        city:{
            type:String
        },
        country:{
            type:String
        },
        zipCode:{
            type:Number
        }
    },
    phone:{
        type:Number
    }
});

//Creating Virtual 'id' 
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

//Enabling serialization(converting string to objects) of virtual fields
userSchema.set('toJSON',{
   virtuals:true 
});

module.exports = mongoose.model('User', userSchema);
