const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.index);
router.get('/new', usuariosController.new);
router.post('/', usuariosController.create);
router.get('/:id', usuariosController.show);
router.get('/:id/edit', usuariosController.edit);
router.post('/:id', usuariosController.update);
router.post('/:id/delete', usuariosController.delete);

module.exports = router;
