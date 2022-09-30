const express = require('express');
const { json, urlencoded } = express;
const app = express();
const router = require('./src/moduls/rutas');

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

app.set('views', './src/views/pages');
app.set('view engine', 'ejs');

app.use('/', router);

const server = app.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});