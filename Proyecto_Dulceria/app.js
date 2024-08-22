const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const productosRoutes = require('./routes/productos');
const usuariosRoutes = require('./routes/usuarios');
const carritoRoutes = require('./routes/carrito');  // Nueva ruta
const recibosRoutes = require('./routes/recibos');  // Nueva ruta
const authRoutes = require('./routes/auth');
const authController = require('./controllers/authController');
const db = require('./models');

const app = express();

// Middleware para analizar datos del formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración del motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuración de sesión y mensajes flash
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1800000 // Duración de la sesión: 30 minutos (en milisegundos)
    }
}));
app.use(flash());

// Middleware para pasar mensajes flash a todas las vistas
app.use((req, res, next) => {
    res.locals.messages = req.flash('error');
    next();
});

// Rutas públicas
app.use('/', authRoutes);

// Rutas protegidas por autenticación
app.use('/productos', authController.ensureAuthenticated, productosRoutes);
app.use('/usuarios', authController.ensureAuthenticated, usuariosRoutes);
app.use('/carrito', authController.ensureAuthenticated, carritoRoutes);  // Nueva ruta
app.use('/recibos', authController.ensureAuthenticated, recibosRoutes);  // Nueva ruta

// Sincronización de la base de datos y levantamiento del servidor
db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
});
