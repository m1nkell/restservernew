const jwt = require('jsonwebtoken');


/*
////////////// Verificar token
*/

let verificarToken = ( req, res, next ) => {

    let token = req.get('token');

    jwt.verify( token, process.env.SEED, (err, decoded) => {

        if(err){
            return res.status(401).json({
                ok: false,
                err
            });
        }


        req.usuario = decoded.usuario;
        next();

    } );


}

let verificaRole = (req, res, next) => {

    let usuario = req.usuario.role;

    if(usuario === 'ADMIN_ROLE'){
        next();
    }
    else{
        return res.status(401).json({
            ok: false,
            err: {
                message: "Usted no dispone de privilegios de administrador."
            }
        });
    }

}



module.exports = {
    verificarToken,
    verificaRole
}