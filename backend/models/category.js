const mongoose = require('mongoose');


const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    icon:{
        type:String,
    },
    color:{
        type:String
    }
});

//Creating Virtual 'id' 
categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

//Enabling serialization(converting string to objects) of virtual fields
categorySchema.set('toJSON',{
   virtuals:true 
});


module.exports = mongoose.model('Category', categorySchema);
