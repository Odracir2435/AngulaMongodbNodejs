const Producto = require("./../models/productoModels");

const fileUpload = require('express-fileupload');


const path = require("path");



let guardar = (req, res) => {

        let body = req.body;

        let producto = new Producto({
            nombre: body.nombre,
            categoria : body.categoria,
            proovedor: body.proovedor,
            precio : body.precio,
            cantidad : body.cantidad,
            
           
        }); 

        producto.save((err, productoNew)=>{
            if (err)
                return res.status(500).send(err);

            return res.json({
                ok: true,
                producto : productoNew
            });
        })

      }




let listar = (req, res) => {
    let name = new RegExp(`.*${req.query.searchBy || ''}.*`)
    Producto.find({nombre: name}).exec((err, datos)=>{
        
        return res.json({datos});
        console.log(datos);
    });
}


let ver_imagen = (req, res) => {

    let ruta = path.join(__dirname, './../../uploads/productos/', req.params.img);
    console.log(ruta);
    return res.sendFile(ruta);
    
}
let modificar = (req,res) =>{
    let producto = {
        nombre: req.body.nombre,
        categoria : req.body.categoria,
        proovedor: req.body.proovedor,
        precio : req.body.precio,
        cantidad : req.body.cantidad,
    }
    Producto.findByIdAndUpdate(req.params.id, producto, {new: true }, (err, productoNew)=>{

        if(err){
            return res.status(401).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            productoNew
        });

    });

}
let ver = (req, res) => {

    Producto.findById(req.params.id).exec((err, datos)=>{
        return res.json({
            datos
        });
    });

}
let eliminar = async (req, res) => {

    try{
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({msg: 'No existe el producto'})
        }

        await Producto.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Producto Eliminado con exito'});
    }catch (error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }

  

    
}


module.exports = {
    guardar,
    listar,
    ver_imagen,
    modificar,
    ver,
    eliminar

    
}