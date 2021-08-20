const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const login = async(req, res = response) =>{

    const {email, password} = req.body;

    try {

        const usuarioDB = await Usuario.findOne({email, activo: true});

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Error, el usuario no existe o esta bloqueado'
            });
        }

        //verificar contraseña
        const validPassword = bcryptjs.compareSync( password, usuarioDB.password );

        if(!validPassword){
            return res.status(404).json({
                ok:false,
                msg:'El usuario o la contraseña son incorrectos.'
            });
        }

        //generar token

        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok:true,
            token,
            usuarioDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'error cconsulte con el administrador'
        })
    }
}


const renewToken = async(req, res = response) => {

    const uid = req.uid;
    // Generar el TOKEN - JWT
    const token = await generarJWT( uid );

    res.json({
        ok: true,
        token
    });

}

module.exports = {
    login,
    renewToken
}