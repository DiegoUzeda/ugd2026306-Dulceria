const { usuarios } = require('../models');

module.exports = {
  index: async (req, res) => {
    try {
      const allUsers = await usuarios.findAll();
      res.render('usuarios/index', { usuarios: allUsers });
    } catch (error) {
      res.status(500).send('Error retrieving users');
    }
  },

  show: async (req, res) => {
    try {
      const user = await usuarios.findByPk(req.params.id);
      if (!user) return res.status(404).send('User not found');
      res.render('usuarios/show', { usuario: user });
    } catch (error) {
      res.status(500).send('Error retrieving user');
    }
  },

  new: (req, res) => {
    res.render('usuarios/new');
  },

  create: async (req, res) => {
    try {
      await usuarios.create(req.body);
      res.redirect('/usuarios');
    } catch (error) {
      res.status(500).send('Error creating user');
    }
  },

  edit: async (req, res) => {
    try {
      const user = await usuarios.findByPk(req.params.id);
      if (!user) return res.status(404).send('User not found');
      res.render('usuarios/edit', { usuario: user });
    } catch (error) {
      res.status(500).send('Error retrieving user for editing');
    }
  },

  update: async (req, res) => {
    try {
      await usuarios.update(req.body, { where: { id_usuario: req.params.id } });
      res.redirect('/usuarios');
    } catch (error) {
      res.status(500).send('Error updating user');
    }
  },

  delete: async (req, res) => {
    try {
      await usuarios.destroy({ where: { id_usuario: req.params.id } });
      res.redirect('/usuarios');
    } catch (error) {
      res.status(500).send('Error deleting user');
    }
  }
};
