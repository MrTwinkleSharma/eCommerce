const {
    getProducts,
    postProducts,
    getProductsList,
    patchProducts,
    deleteProducts
} = require('../controllers/productController');

const fileUploadConfig = require('../helpers/fileUploadConfig');
const router = require('express').Router()

router.get('/', getProductsList);
router.get('/:id', getProducts);

//Adding the multer config
router.post('/',  fileUploadConfig.single('image') , postProducts);
router.patch('/:id', patchProducts);
router.delete('/:id', deleteProducts); 

module.exports = router;
