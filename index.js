const exp = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const usuariosRoutes = require('./routes/usuarios');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const productosRoutes = require('./routes/producto_router');
const passport = require('passport');
const apiProductosRoutes = require('./routes/api_productos');
require('./src/config/passport');

require('dotenv').config();

const app = exp();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); 


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: `mongodb+srv://${process.env.USUARIOBD}:${process.env.PASSBD}@adso2846458.cjplz.mongodb.net/${process.env.BD}`,
    collectionName: 'sessions'
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 día
}));

// Middleware para hacer disponible 'usuario' en las vistas EJS
app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario || null;
    res.locals.request = req;
    next();
});

app.use(exp.urlencoded({ extended: true })); // Middleware para parsear el cuerpo de las solicitudes
app.use(expressEjsLayouts);
app.set('layout', 'pages/bases/base');

app.use('/css', exp.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', exp.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/static', exp.static(__dirname + '/public'));
app.use('/', productosRoutes);
app.use('/', usuariosRoutes);
app.use(passport.initialize());
app.use(passport.session());
app.use(apiProductosRoutes);

app.get('/', (req, res) => {
    try {
        const messages = req.session.messages || [];
        req.session.messages = []; 
        res.render('pages/index', {
            titulo: 'Inicio',
            messages
        });
    } catch (error) {
        console.error('Error al renderizar la vista:', error);
        res.status(500).send('Error interno del servidor');
    }
});



app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});