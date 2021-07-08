const {
    getUsers,
    getUser,
    postUser,
    patchUser,
    deleteUser
} = require('../controllers/userController');

const router = require('express').Router()

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', postUser);
router.patch('/:id', patchUser);
router.delete('/:id', deleteUser); 

module.exports = router;
