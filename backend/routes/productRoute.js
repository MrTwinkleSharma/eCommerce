const {
    getProducts,
    postProducts,
    getProductsList,
    patchProducts,
    deleteProducts
} = require('../controllers/productController');

const router = require('express').Router()

router.get('/', getProductsList);
router.get('/:id', getProducts);
router.post('/', postProducts);
router.patch('/:id', patchProducts);
router.delete('/:id', deleteProducts); 

module.exports = router;
