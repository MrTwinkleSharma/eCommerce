const Order = require("../models/order");
const { isValidObjectId } = require("mongoose");
const OrderItem = require("../models/orderItem");

const getOrders = async (req, res) =>{
    const orderList = await Order.find()
    .populate('user', 'name')
    
    if(!orderList)
    return res.status(400).send("Orders can't be retrieved!");

    res.status(200).send(orderList);
}

const getOrder = async (req, res) =>{
    const {id} = req.params;     
    if(!isValidObjectId(id)) 
    return res.status(400).send("Id is not valid, Interaction with server can't be proceeded!");

    const order = await Order.findById(id)
    .populate('user','name')
    .populate({path:'orderItems', 
                        populate:{path:'product',
                                    populate:'category'}});


    if(!order)
    return res.status(400).send("Order can't be retrieved!")

    res.status(200).send(order);
}
const postOrder = async (req, res) =>{
    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderitem) => {
        let orderItem = OrderItem({
            product:orderitem.product,
            quantity:orderitem.quantity
        });
        orderItem = await orderItem.save();
        return orderItem._id;
    }));
    const orderItemIdsResolved = await orderItemsIds;
    const {
        shippingAddress,
        user,
        phone,
    } = req.body;

    let newOrder = Order({
        shippingAddress,
        user,
        phone,
        orderItems:orderItemIdsResolved
    })
    newOrder = await newOrder.save();
    
    if(!newOrder)
    res.status(400).send("Order can't be posted!")
    else
    res.status(200).send(newOrder);
}


const patchOrder = async (req, res) =>{
    const {id} = req.params;     
    if(!isValidObjectId(id)) 
    return res.status(400).send("Id is not valid, Interaction with server can't be proceeded!");

    const {phone} = req.body;
    let order = await Order.findById(id);
    
    if(!order)
    return res.status(400).send("Order can't be updated!")
    
    order.phone = phone;
    order = await order.save();

    if(!order)
    res.status(400).send("Order can't be updated!")
    else
    res.status(200).send(order);
}

const deleteOrder = (req, res) =>{
    const {id} = req.params;
    if(!isValidObjectId(id)) 
    return res.status(400).send("Id is not valid, Interaction with server can't be proceeded!");

    Order.findByIdAndRemove(id)
    .then((order)=>{
        if(order)
        res.status(200).json({success:true, message:"Order is Deleted!"})
        else
        res.status(404).json({success:false, message:"Order not found!"})
        
    })
    .catch((err)=>{
        res.status(500).json({success:false, message:"Order can't be Deleted, due to some Error!"})
    });
}

module.exports = {
    getOrders,
    getOrder,
    postOrder,
    patchOrder,
    deleteOrder
};