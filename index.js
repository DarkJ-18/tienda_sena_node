const exp = require('express');
require('dotenv').config();

const app = exp();

app.get('/', (req, res) => {
    res.write('Welcome :D');
    res.end();
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor en linea, puerto ${process.env.PORT}`);
});