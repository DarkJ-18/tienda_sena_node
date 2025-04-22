const exp = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const productosRoutes = require('./routes/productos');
require('dotenv').config();

const app = exp();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // Configurar carpeta de vistas

// Middleware para hacer disponible 'request' en las vistas EJS
app.use((req, res, next) => {
    res.locals.request = req;
    next();
});

app.use(expressEjsLayouts);
app.set('layout', 'pages/bases/base'); // Configurar layout base

app.use('/css', exp.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', exp.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/static', exp.static(__dirname + '/public'));
app.use('/', productosRoutes);

app.get('/', (req, res) => {
    try {
        res.render('pages/index', {
            titulo: 'Inicio', // Cambia 'title' por 'titulo' para que coincida con tu base.ejs
        });
    } catch (error) {
        console.error('Error al renderizar la vista:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor en línea, puerto ${process.env.PORT}`);
});