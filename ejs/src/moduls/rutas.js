const products = require('../class/Products');
const express = require('express');
const multer = require('multer');
const { Router } = express;
const router = Router();
const path = require('path');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.render('index');
});
router.get('/productos', (req, res) => {
    const arrayProducts = products.getAll();
    console.log(arrayProducts);
    if(arrayProducts.length!==0)
        res.render('../partials/productos', {arrayProducts, render: true});
    else
        res.render('../partials/productos', {message:'No hay productos'});
});
router.post('/productos', upload.single('myfile'), (req, res, next) => {
    const file = req.file;
    console.log(file)
    if(!file) {
        const err = new Error('No cargo el archivo,');
        err.httpStatusCode = 400;
        return next(err);
    }
    const { title, price } = req.body;
    const product = {
        title: title,
        price: price,
        thumbnail: file.path
    }
    products.addProdutcs(product);
    res.redirect('/');
});

module.exports = router;