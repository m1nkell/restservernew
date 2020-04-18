const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const { verificarToken, verificaRole } = require('../middlewares/autenticacion');

app.get('/usuario', verificarToken , (req, res) => {

    let desde = req.query.desde;
    desde = Number(desde);

    let limite = req.query.limite;
    limite = Number(limite);
    
    Usuario.find({ estado: true })
            .skip(desde)
            .limit(limite)
            .exec((err,usuario) => {

                if(err){
                    res.status(400).json({
                        ok: false,
                        err
                    });
                }

                Usuario.count({estado:true},(err,conteo) => {

                    res.json({
                        ok: true,
                        usuario,
                        cantidad: `la cantidad de registros es de ${conteo}`
                    });

                });

            });

});

app.post('/usuario', [verificarToken, verificaRole], (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        role: body.role
    });

    usuario.save( (err, usuarioDB) => {

        if(err){
            
            return res.status(400).json({
                ok: false,
                err
            });

        }

        usuarioDB.password = null;

        res.json({

            ok: true,
            usuario: usuarioDB

        });

    } );

});

app.put('/usuario/:id', [verificarToken, verificaRole], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body,['nombre','email','img','role','estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true }, (err,usuarioDB) => {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

//app.delete('/usuario/:id', function(req, res) {
app.delete('/usuario/:id', [verificarToken, verificaRole], (req, res) => {
    
    let id = req.params.id;

    //let query1 = {_id: id}

    Usuario.findOneAndUpdate(id,{ estado: false },{ new: true },(err,usuarioBuscado) => {

        if(err){

            res.status(400).json({
                ok: false,
                err
            });

        }

        res.json({
            ok: true,
            usuarioBuscado
        });

    } );



});




module.exports = app;