const express = require('express');
const hbs = require('express-handlebars');
const { json, urlencoded } = express;
const app = express();
const router = require('./src/moduls/rutas');

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

app.engine('hbs', hbs.engine({
    extname:'.hbs',
    partialsDir: __dirname + '/src/views/partials',
    layoutsDir: __dirname + '/src/views/layouts',
    defaultLayout: 'layout.hbs'
}));

app.set('views', './src/views/partials');
app.set('view engine', 'hbs');

app.use('/', router);

const server = app.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});