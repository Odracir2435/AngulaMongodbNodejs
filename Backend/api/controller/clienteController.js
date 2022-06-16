const Cliente = require("./../models/clienteModels");

let listar = (req, res) => {
    let name = new RegExp(`.*${req.query.searchBy || ''}.*`)
    

    Cliente.find({nombre: name}).exec((err, datos)=>{
        if(err)
            return res.json({
                ok: false,
                err
            }); 

        res.json(datos);
    })

}
let guardar = (req, res) => {

    let body = req.body;

    let cliente = new Cliente({
        nombre: body.nombre,
        direccion : body.direccion,
        telefono : body.telefono
       
    }); 

    cliente.save((err, clienteNew)=>{
        if (err)
            return res.status(500).send(err);

        return res.json({
            ok: true,
            cliente : clienteNew
        });
    })

  }

  let ver = (req, res) => {

    Cliente.findById(req.params.id).exec((err, datos)=>{
        return res.json({
            datos
        });
    });

}
let modificar = (req, res) => {

    let cliente = {
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        telefono: req.body.telefono
    }

    Cliente.findByIdAndUpdate(req.params.id, cliente, {new: true }, (err, clienteNew)=>{

        if(err){
            return res.status(401).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            clienteNew
        });

    });

}
let eliminar = async (req, res) => {

    try{
        let cliente = await Cliente.findById(req.params.id);

        if(!cliente){
            res.status(404).json({msg: 'No existe el cliente'})
        }

        await Cliente.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Cliente Eliminado con exito'});
    }catch (error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }

  

    
}

module.exports = {
    listar,
    guardar,
    ver,
    modificar,
    eliminar



}