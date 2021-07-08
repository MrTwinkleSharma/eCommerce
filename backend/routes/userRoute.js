const {
    getUsers,
    getUser,
    postUser,
    patchUser,
    deleteUser,
    loginUser
} = require('../controllers/userController');

const router = require('express').Router()

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', postUser);
router.patch('/:id', patchUser);
router.delete('/:id', deleteUser); 
router.post('/login', loginUser); 

module.exports = router;
