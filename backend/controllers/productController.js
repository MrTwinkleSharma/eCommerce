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

    const file = req.file;
    if(!file)
    {
        return res.status(400).send("Image not Found!")
    }
    const newProduct = Product({
        name,
        description,
        price,
        stockCount,
        category,
        image:req.file.path
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

const patchProductGallery = async (req, res) =>{
    const {id} = req.params;     
    let product = await Product.findById(id);
   
    const files = req.files;
    if(!files) return res.status(400).send("Image not Found!")
    
    const pathOfImages = [];
    files.map(file=>{
        pathOfImages.push(file.path);
    })

    product.images = pathOfImages;
    await product.save();

    if(!product)
    res.status(400).send("Product Gallery can't be Updated!")
    else
    res.status(200).send(product);
}

const getFeaturedProducts = async (req, res) =>{
    const products = await Product.find({isFeatured:true})
    
    if(!products)
    res.status(400).send("Products can't be retrieved!");
    else
    res.status(200).send(products);
}
module.exports = {
    getProducts,
    postProducts,
    getProductsList,
    patchProducts,
    deleteProducts,
    patchProductGallery,
    getFeaturedProducts
};
