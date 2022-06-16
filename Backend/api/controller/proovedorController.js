

const Proovedor = require("../models/proovedorModels");

const path = require("path");

let index = (req, res) => {
    let name = new RegExp(`.*${req.query.searchBy || ''}.*`)
    Proovedor.find({nombre: name}).exec((err, datos)=>{

        return res.json({
            datos
        });

    });
}
let guardar = (req, res) => {

    let body = req.body;

    let proovedor = new Proovedor({
        nombre: body.nombre,
        empresa : body.empresa,
        correo : body.correo,
        telefono : body.telefono
       
    }); 

    proovedor.save((err, proovedorNew)=>{
        if (err)
            return res.status(500).send(err);

        return res.json({
            ok: true,
            proovedor : proovedorNew
        });
    })

  }

let ver = (req, res) => {

    Proovedor.findById(req.params.id).exec((err, datos)=>{
        return res.json({
            datos
        });
    });

}

let modificar = (req, res) => {

    let proovedor = {
        nombre: req.body.nombre,
        empresa: req.body.empresa,
        telefono: req.body.telefono,
        correo: req.body.correo,
    }

    Proovedor.findByIdAndUpdate(req.params.id, proovedor, {new: true }, (err, proovedorNew)=>{

        if(err){
            return res.status(401).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            proovedorNew
        });

    });

}

let eliminar = async (req, res) => {

    try{
        let proovedor = await Proovedor.findById(req.params.id);

        if(!proovedor){
            res.status(404).json({msg: 'No existe el proovdeor'})
        }

        await Proovedor.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Proovedor Eliminado con exito'});
    }catch (error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }

  

    
}








module.exports = {
    index,
    guardar,
    ver, 
    modificar,
    eliminar
   
}

