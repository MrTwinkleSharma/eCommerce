const {
    getUsers,
    getUser,
    postUser,
    patchUser,
    deleteUser,
    loginUser
} = require('../controllers/userController');

const {
    getOrdersByUserId
} = require('../controllers/orderController');



const router = require('express').Router()

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', postUser);
router.patch('/:id', patchUser);
router.delete('/:id', deleteUser); 
router.post('/login', loginUser);  
router.post('/signup', postUser); 
router.get('/orders/:id', getOrdersByUserId);

module.exports = router;
