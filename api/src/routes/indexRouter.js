const { Router } = require('express');
const { products } = require('../../api');
const { Product } = require('../db');
const { productRouter } = require("./productRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/product", productRouter);
router.use("/search",productRouter);

router.use("/api", async (req, res) => {
    const allProducts = await Product.findAll();
    if (!allProducts.length) {
        await Product.bulkCreate(products);
        res.status(200).json("Producto Cargado");
    } else {
        res.status(200).json("Producto ya esta cargado");
    }
});


module.exports = router;
