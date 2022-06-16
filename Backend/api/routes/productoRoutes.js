const express = require('express');
const ProductosController = require("./../controller/productoController");

const { token_imagen } = require("./../middleware/autenticacion");

var router = express.Router();

router.post("/producto", ProductosController.guardar);
router.get("/producto", ProductosController.listar);
router.get("/producto/imagen/:img", ProductosController.ver_imagen);
router.get("/producto/:id", /*auth,*/ ProductosController.ver)
router.put("/producto/:id", /*auth,*/ ProductosController.modificar)
router.delete("/producto/:id", /*auth,*/ ProductosController.eliminar)


module.exports = router;