const { productos } = require('../models');

module.exports = {
  index: async (req, res) => {
    const allProducts = await productos.findAll();
    res.render('productos/index', { productos: allProducts });
  },

  show: async (req, res) => {
    const product = await productos.findByPk(req.params.id);
    res.render('productos/show', { producto: product });
  },

  new: (req, res) => {
    res.render('productos/new');
  },

  create: async (req, res) => {
    await productos.create(req.body);
    res.redirect('/productos');
  },

  edit: async (req, res) => {
    const product = await productos.findByPk(req.params.id);
    res.render('productos/edit', { producto: product });
  },

  update: async (req, res) => {
    await productos.update(req.body, { where: { id_producto: req.params.id } });
    res.redirect('/productos');
  },

  delete: async (req, res) => {
    await productos.destroy({ where: { id_producto: req.params.id } });
    res.redirect('/productos');
  }
};
