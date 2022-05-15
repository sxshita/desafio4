const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const routerProductos = express.Router();

const app = express();

const Container = require('./app');
const Productos = new Container();
  
const uploader = multer();

const port = 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ---------------------------------------------------------------------------

routerProductos.get('/', (req, res) => {
    const products = Productos.getProducts();
    if(!products) res.send({ error: 'No hay productos cargados'})
    else if(products) res.send({ products });
});

routerProductos.get('/subir', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

routerProductos.post('/subida', uploader.none(), (req, res) => {
   if (!req.body) return res.sendStatus(400);
   const id = Productos.addProduct(req.body);
   const product = Productos.getProductById(id);
   res.send({product});
});

routerProductos.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = Productos.getProductById(id);
    if(!product) res.send({ error: 'Producto no encontrado' });
    else if(product) res.send({ product });
})

routerProductos.put('/:id', (req, res) => {
    const response = Productos.updateProductById(parseInt(req.params.id), req.body);
    res.send({response});
});

routerProductos.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Productos.deleteProductBtId(id);
    res.send("Producto eliminado correctamente");
});

// -------------------------------------------------------------------

app.use('/api/productos', routerProductos);

const server = app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});

server.on("error", error => console.log(`Error en servidor ${error}`));