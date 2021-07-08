const {
    getUserslist,
    getUsers,
    postUsers,
    pacthUsers,
    deleteUsers
} = require('../controllers/userController');

const router = require('express').Router()

router.get('/', getUserslist);
router.get('/:id', getUsers);
router.post('/', postUsers);
router.patch('/:id', pacthUsers);
router.delete('/:id', deleteUsers); 

module.exports = router;
