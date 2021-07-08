const Product = require("../models/product");

const getProductsList = async (req, res) =>{
    const productList = await Product.find().populate('category');

    if(!productList)
    return res.status(400).send("Products can't be retrieved!")
    

    res.status(200).send(productList);
}

const getProducts = async (req, res) =>{
    const {id} = req.params;     

    const product = await Product.findById(id).populate('category');

    if(!product)
    res.status(400).send("Product can't be retrieved!")

    res.status(200).send(product);
}
const postProducts = async (req, res) =>{
    const {
        name,
        description,
        price,
        stockCount,
        category
    } = req.body;

    let existingProduct = await Product.findOne({name:name});
    if(existingProduct)
    {
        return res.status(400).send("Product exist already!")
    }
    const newProduct = Product({
        name,
        description,
        price,
        stockCount,
        category
    })
    await newProduct.save();
    
    if(!newProduct)
    res.status(400).send("Product can't be posted!")

    res.status(200).send(newProduct);
}


const patchProducts = async (req, res) =>{
    const {id} = req.params;     
    // mongoose.isValidObjectId(id); 
    const {name} = req.body;
    const product = await Product.findById(id);
    if(!product)
    {
        return res.status(400).send("Product can't be updated!")
    }

    product.name = name;
    await product.save();

    res.status(200).send(product);
}

const deleteProducts = (req, res) =>{
    const {id} = req.params;

    Product.findByIdAndRemove(id)
    .then((product)=>{
        if(product)
        res.status(200).json({success:true, message:"Product is Deleted!"})
        else
        res.status(404).json({success:false, message:"Product not found!"})
        
    })
    .catch((err)=>{
        res.status(404).json({success:false, message:"Product can't be Deleted!"})
    });
}



module.exports = {
    getProducts,
    postProducts,
    getProductsList,
    patchProducts,
    deleteProducts
};
