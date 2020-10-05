const jwt= require('jsonwebtoken');

function verify(req,res,next){


    if(!req.headers['access-token']){

        return res.status(401).send("mejor");
    }

    const token = req.headers['access-token'].split(' ')[1];

    if(token==='null'){

        return res.status(401).send('todo');
    }



    const payload= jwt.verify(token,'secret');
    console.log('paylod'+payload.id);
    req.userId=payload.id;
    next();
}

module.exports=verify;