const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/', productosController.index);
router.get('/new', productosController.new);
router.post('/', productosController.create);
router.get('/:id', productosController.show);
router.get('/:id/edit', productosController.edit);
router.post('/:id', productosController.update);
router.post('/:id/delete', productosController.delete);

module.exports = router;
