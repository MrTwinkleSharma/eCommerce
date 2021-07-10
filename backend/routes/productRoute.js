const {
    getProducts,
    postProducts,
    getProductsList,
    patchProducts,
    deleteProducts,
    patchProductGallery
} = require('../controllers/productController');

const fileUploadConfig = require('../helpers/fileUploadConfig');
const router = require('express').Router()

router.get('/', getProductsList);
router.get('/:id', getProducts);

//Adding the multer config
router.post('/',  fileUploadConfig.single('image') , postProducts);
router.patch('/:id', patchProducts);
router.delete('/:id', deleteProducts); 
router.patch('/gallery/:id',  fileUploadConfig.array('images',10) , patchProductGallery);

module.exports = router;
