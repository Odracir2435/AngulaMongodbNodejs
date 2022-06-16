const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const Usuario = require("./../models/usuarioModels");

let index = (req, res) => {
    let name = new RegExp(`.*${req.query.searchBy || ''}.*`)
    Usuario.find({nombre: name}).exec((err, datos)=>{

        return res.json({
            datos
        });

    });
}
let guardar = (req, res) => {
    let usuario = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        correo: req.body.correo,
        usuario: req.body.usuario,
        clave: bcrypt.hashSync(req.body.clave, 10)
    });
    
    usuario.save((err, usuarioNew)=>{

        if(err){
            return res.status(401).json({
                ok: false,
                err
            });
        }

        return res.status(201).json({
            ok: true,
            usuario: usuarioNew
        });

    });
}

let ver = (req, res) => {

    Usuario.findById(req.params.id).exec((err, datos)=>{
        return res.json({
            datos
        });
    });

}

let modificar = (req, res) => {

    let usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        correo: req.body.correo,
        usuario: req.body.usuario,
        clave: bcrypt.hashSync(req.body.clave, 10)
    }

    Usuario.findByIdAndUpdate(req.params.id, usuario, {new: true }, (err, usuarioNew)=>{

        if(err){
            return res.status(401).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            usuarioNew
        });

    });

}

let eliminar = async (req, res) => {

    try{
        let usuario = await Usuario.findById(req.params.id);

        if(!usuario){
            res.status(404).json({msg: 'No existe el usuario'})
        }

        await Usuario.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Producto Eliminado con exito'});
    }catch (error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }

  

    
}

let login = (req, res)=> {

    Usuario.findOne({usuario : req.body.usuario}, (err, usuario)=>{

        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!usuario){
            return res.status(404).json({
                ok:false,
                men: "Usuario o clave invalida"
            });
        }

        if(!bcrypt.compareSync(req.body.clave, usuario.clave)){
            return res.status(404).json({
                ok:false,
                men: "Usuario o clave invalida"
            });
        }

        let token = jwt.sign({
            data: usuario
        }, process.env.SECRET, { expiresIn: '4h' });

        res.json({
            ok:true,
            usuario,
            token
        });

    });

}








module.exports = {
    index,
    guardar,
    ver, 
    modificar,
    eliminar, 
    login
}

