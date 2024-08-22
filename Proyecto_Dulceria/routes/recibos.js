const express = require('express');
const router = express.Router();
const { Recibo, ProductoRecibo, productos } = require('../models');

// Mostrar todos los recibos
router.get('/', async (req, res) => {
    const recibos = await Recibo.findAll({ include: [{ model: ProductoRecibo, include: [productos] }] });
    res.render('recibos', { recibos });
});

module.exports = router;
