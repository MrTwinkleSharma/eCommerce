const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { isValidObjectId } = require("mongoose");

const getUsers = async (req, res) =>{
    const userList = await User.find().select('-password');

    if(!userList)
    return res.status(400).send("Users can't be retrieved!");

    res.status(200).send(userList);
}

const getUser = async (req, res) =>{
    const {id} = req.params;     
    if(!isValidObjectId(id)) 
    return res.status(400).send("Id is not valid, Interaction with server can't be proceeded!");

    const user = await User.findById(id).select('-password');

    if(!user)
    return res.status(400).send("User can't be retrieved!")

    res.status(200).send(user);
}
const postUser = async (req, res) =>{
    const {
        name,
        email,
        // password
    } = req.body;

    let existingUser = await User.findOne({email:email});
    if(existingUser)
    return res.status(400).send("User with this email exist already!")
    
    let newUser = User({
        name,
        email,
        password:bcryptjs.hashSync(req.body.password,10)
    })
    newUser = await newUser.save();
    
    if(!newUser)
    res.status(400).send("User can't be posted!")
    else
    res.status(200).send(newUser);
}


const patchUser = async (req, res) =>{
    const {id} = req.params;     
    if(!isValidObjectId(id)) 
    return res.status(400).send("Id is not valid, Interaction with server can't be proceeded!");

    const {name} = req.body;
    let user = await User.findById(id);
    
    if(!user)
    return res.status(400).send("User can't be updated!")
    
    user.name = name;
    user = await user.save();

    if(!user)
    res.status(400).send("User can't be updated!")
    else
    res.status(200).send(user);
}

const deleteUser = (req, res) =>{
    const {id} = req.params;
    if(!isValidObjectId(id)) 
    return res.status(400).send("Id is not valid, Interaction with server can't be proceeded!");

    User.findByIdAndRemove(id)
    .then((user)=>{
        if(user)
        res.status(200).json({success:true, message:"User is Deleted!"})
        else
        res.status(404).json({success:false, message:"User not found!"})
        
    })
    .catch((err)=>{
        res.status(500).json({success:false, message:"User can't be Deleted, due to some Error!"})
    });
}


module.exports = {
    getUsers,
    getUser,
    postUser,
    patchUser,
    deleteUser
};