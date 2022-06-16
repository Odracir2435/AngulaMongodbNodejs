const express = require('express');
const ProovedorController = require('../controller/proovedorController');

const { auth }  = require("../middleware/autenticacion");

var router = express.Router();

router.get("/proovedor", /*auth,*/ ProovedorController.index);
router.post("/proovedor", /*auth,*/ ProovedorController.guardar);
router.get("/proovedor/:id", /*auth,*/ ProovedorController.ver)
router.put("/proovedor/:id", /*auth,*/ ProovedorController.modificar)
router.delete("/proovedor/:id", /*auth,*/ ProovedorController.eliminar)



module.exports = router;