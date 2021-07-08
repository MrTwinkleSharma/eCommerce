
const User = require("../models/user");

const getUserslist = async (req, res) =>{
    const userList = await User.find();

    if(!userList)
    return res.status(400).send("Users can't be retrieved!")
    

    res.status(200).send(userList);
}

const getUsers = async (req, res) =>{
    const {id} = req.params;     

    const user = await User.findById(id);

    if(!user)
    res.status(400).send("User can't be retrieved!")

    res.status(200).send(user);
}
const postUsers = async (req, res) =>{
    const {
        name,
        email,
        password
    } = req.body;

    let existingUser = await User.findOne({email:email});
    if(existingUser)
    {
        return res.status(400).send("User exist already!")
    }
    const newUser = User({
        name,
        email,
        password
    })
    await newUser.save();
    
    if(!newUser)
    res.status(400).send("User can't be posted!")

    res.status(200).send(newUser);
}


const pacthUsers = async (req, res) =>{
    const {id} = req.params;     
    // mongoose.isValidObjectId(id); 
    const {name} = req.body;
    const user = await User.findById(id);
    if(!user)
    {
        return res.status(400).send("User can't be updated!")
    }

    user.name = name;
    await user.save();

    res.status(200).send(user);
}

const deleteUsers = (req, res) =>{
    const {id} = req.params;

    User.findByIdAndRemove(id)
    .then((user)=>{
        if(user)
        res.status(200).json({success:true, message:"user is Deleted!"})
        else
        res.status(404).json({success:false, message:"user not found!"})
        
    })
    .catch((err)=>{
        res.status(404).json({success:false, message:"user can't be Deleted!"})
    });
}


module.exports = {
    getUserslist,
    getUsers,
    postUsers,
    pacthUsers,
    deleteUsers
};