const express = require('express');
const router = express.Router();
const db = require('../models');
const { productos, Recibo, ProductoRecibo } = require('../models');

// Mostrar productos y formulario para agregar al carrito
router.get('/', async (req, res) => {
    const productosDisponibles = await productos.findAll();
    res.render('carrito', { productos: productosDisponibles });
});

// Agregar productos al carrito
router.post('/agregar', async (req, res) => {
    const { id_producto, cantidad } = req.body;
    const producto = await productos.findByPk(id_producto);

    if (!req.session.carrito) {
        req.session.carrito = [];
    }

    const itemEnCarrito = req.session.carrito.find(item => item.id_producto === producto.id_producto);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad += parseInt(cantidad);
    } else {
        req.session.carrito.push({
            id_producto: producto.id_producto,
            nombre_producto: producto.nombre_producto,
            precio_producto: producto.precio_producto,
            cantidad: parseInt(cantidad)
        });
    }

    res.redirect('/carrito');
});

// Mostrar el carrito
router.get('/ver', (req, res) => {
    const total = req.session.carrito ? req.session.carrito.reduce((sum, item) => sum + item.precio_producto * item.cantidad, 0) : 0;
    res.render('verCarrito', { carrito: req.session.carrito || [], total });
});

// Finalizar compra
router.post('/comprar', async (req, res) => {
    const { cliente } = req.body;

    if (!req.session.carrito || req.session.carrito.length === 0) {
        req.flash('error', 'El carrito está vacío');
        return res.redirect('/carrito');
    }

    const t = await db.sequelize.transaction();

    try {
        const total = req.session.carrito.reduce((sum, item) => sum + item.precio_producto * item.cantidad, 0);

        // Crear recibo
        const recibo = await Recibo.create({
            cliente,
            total
        }, { transaction: t });

        // Crear detalle del recibo
        for (const item of req.session.carrito) {
            await ProductoRecibo.create({
                id_recibo: recibo.id_recibo,
                id_producto: item.id_producto,
                cantidad: item.cantidad
            }, { transaction: t });
        }

        await t.commit();
        req.session.carrito = [];
        res.redirect('/carrito/ver');
    } catch (error) {
        await t.rollback();
        console.log(error);
        res.status(500).send('Error al procesar la compra');
    }
});

module.exports = router;
