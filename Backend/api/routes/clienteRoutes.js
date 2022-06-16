const express = require('express');
const ClienteController = require("./../controller/clienteController");

var router = express.Router();

router.get("/cliente", ClienteController.listar);
router.post("/cliente", /*auth,*/ ClienteController.guardar);
router.get("/cliente/:id", /*auth,*/ ClienteController.ver)
router.put("/cliente/:id", /*auth,*/ ClienteController.modificar)
router.delete("/cliente/:id", /*auth,*/ ClienteController.eliminar)

module.exports = router;