const exp = require('express');
require('dotenv').config();

const app = exp();
app.set('view engine','ejs');

app.use('/css', exp.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', exp.static(__dirname + '/node_modules/bootstrap/dist/js'));



app.get('/',(req, res)=>{
    res.render('index')
})

app.listen(process.env.PORT, () => {
    console.log(`Servidor en linea, puerto ${process.env.PORT}`);
});