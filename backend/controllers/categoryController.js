const Category = require('../models/category.js');

const getCategoriesList = async (req, res) =>{
    const categoriesList = await Category.find();

    if(!categoriesList)
    res.status(400).send("Categories can't be retrieved!")

    res.status(200).send(categoriesList);
}

const getCategories = async (req, res) =>{
    const {id} = req.params;     

    const category = await Category.findById(id);

    if(!category)
    res.status(400).send("Category can't be retrieved!")

    res.status(200).send(category);
}
const postCategories = async (req, res) =>{
    const {name} = req.body;

    let existingCategory = await Category.findOne({name:name});
    if(existingCategory)
    {
        return res.status(400).send("Category exist already!")
    }
    const newCategory = Category({
        name
    })
    await newCategory.save();
    
    if(!newCategory)
    res.status(400).send("Category can't be posted!")

    res.status(200).send(newCategory);
}


const putCategory = async (req, res) =>{
    const {id} = req.params;     
    const {name} = req.body;

    const category = await Category.findByIdAndUpdate(id, {name:name}, {new:true});
    if(!category)
    {
        return res.status(400).send("Category can't be updated!")
    }

    res.status(200).send(category);
}

const deleteCategory = (req, res) =>{
    const {id} = req.params;

    Category.findByIdAndRemove(id)
    .then((category)=>{
        if(category)
        res.status(200).json({success:true, message:"Category is Deleted!"})
        else
        res.status(404).json({success:false, message:"Category not found!"})
        
    })
    .catch((err)=>{
        res.status(404).json({success:false, message:"Category can't be Deleted!"})
    });
}



module.exports = {
    getCategories,
    postCategories,
    getCategoriesList,
    putCategory,
    deleteCategory
};
