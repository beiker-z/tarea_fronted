const express= require('express');
const router= express.Router();
const mysqlConnection= require('../db/database');
const jwt=require('jsonwebtoken');



router.post("/login",(req, res)=>{

  
    const body= req.body;
    console.log(body.userName);
    let user;

    mysqlConnection.query('SELECT * FROM usuarios WHERE nombre = ?',body.userName,(err,rows,filed)=>{

    if(!err){

        user=rows[0];

        if(user===undefined){
            return  res.status(401).send('user does not exist');

        }
        if(body.password === user.password){

            let token = jwt.sign({id: user.id},'secret',{ expiresIn:'30M'});
            return res.status(200).json({token});
        }
        else{
            return res.status(401).send('login invalid');
        }
    }else{
        return res.status(500).send(err);
    }
    
    });

});

module.exports=router;