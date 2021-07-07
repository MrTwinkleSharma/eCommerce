const mongoose = require('mongoose');
const { getCategories, getCategoriesList, postCategories, putCategory, deleteCategory } = require('../controllers/categoryController');
const router = require('express').Router()

router.get('/', getCategoriesList);
router.get('/:id', getCategories);
router.post('/', postCategories);
router.put('/:id', putCategory);
router.delete('/:id', deleteCategory); 

module.exports = router;
