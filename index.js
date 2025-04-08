const exp = require('express');
require('dotenv').config();

const app = exp();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // Configurar carpeta de vistas

app.use('/css', exp.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', exp.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/static', exp.static(__dirname + '/public'));

app.get('/', (req, res) => {
    try {
        res.render('pages/index');
    } catch (error) {
        console.error('Error al renderizar la vista:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor en línea, puerto ${process.env.PORT}`);
});