const router = require('express').Router()
const {
    getOrders,
    getOrder,
    postOrder,
    patchOrder,
    deleteOrder
} = require('../controllers/orderController');


router.get('/', getOrders);
router.get('/:id', getOrder);
router.post('/', postOrder);
router.patch('/:id', patchOrder);
router.delete('/:id', deleteOrder); 

module.exports = router;
