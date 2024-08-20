const { usuarios } = require('../models');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

module.exports = {
  showLogin: (req, res) => {
    res.render('auth/login');
  },

  showRegister: (req, res) => {
    res.render('auth/register');
  },

  register: async (req, res) => {
    const { nombre_usuario, email_usuario, contrasena_usuario, apellido_paterno_usuario, apellido_materno_usuario, id_rol, id_genero } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(contrasena_usuario, 10);
      await usuarios.create({
        nombre_usuario,
        email_usuario,
        contrasena_usuario: hashedPassword,
        apellido_paterno_usuario,
        apellido_materno_usuario,
        id_rol,
        id_genero
      });
      res.redirect('/login');
    } catch (error) {
      res.status(500).send('Error registering user');
      console.log(error);
    }
  },

  login: async (req, res) => {
    const { email_usuario, contrasena_usuario } = req.body;

    try {
      const user = await usuarios.findOne({ where: { email_usuario } });
      if (!user || !(await bcrypt.compare(contrasena_usuario, user.contrasena_usuario))) {
        req.flash('error', 'Invalid email or password');
        return res.redirect('/login');
      }
      req.session.userId = user.id_usuario;
      res.redirect('/usuarios');
    } catch (error) {
      res.status(500).send('Error logging in');
    }
  },

  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send('Error logging out');
      }
      res.redirect('/login');
    });
  },

  ensureAuthenticated: (req, res, next) => {
    if (req.session.userId) {
      return next();
    }
    req.flash('error', 'You need to log in');
    res.redirect('/login');
  }
};
