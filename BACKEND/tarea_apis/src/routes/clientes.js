const express= require('express');
const router= express.Router();
const mysqlConnection=require('../db/database');
const security=require('../security/verifier');


router.get('/clientes',security,(req,res)=>{
mysqlConnection.query('SELECT * FROM clientes',(err,rows,fields)=>{

    if(!err){

         res.status(200).send(rows);
    }
    else{

 console.log(err.sqlMessage);
 res.status(500).send(err.sqlMessage);
    }

});

});

router.get('/clientes/:id',security,(req,res)=>{

    mysqlConnection.query('SELECT * FROM clientes where id= ?',[req.params.id],(err,rows,fields)=>{

        if(!err){
    res.status(200).send(rows);
        }
        else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    });
});

router.post('/clientes/add',security,(req,res)=>{

    let mp=req.body;

    mysqlConnection.query('INSERT INTO clientes (nombre,direccion,nit,creado_por) VALUES (?,?,?,?)',
    [mp.nombre,mp.direccion,mp.nit,mp.creado_por],(err,result)=>{

        if(!err){
            res.send('CREATED SUCCESFULLY')
        }
        else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    });

});

router.put('/clientes/:id',security,(req,res)=>
{
    let idcliente=req.params.id;
    let emp=req.body;

    mysqlConnection.query('UPDATE clientes set nombre=?, direccion=?, nit=?, creado_por=? WHERE id=?'
    ,[emp.nombre,emp.direccion,emp.nit,emp.creado_por,idcliente],(err,result)=>{
    if(!err){
        res.send('UPDATE SUCCEFULLY');
    }
    else{

        res.status(500).send(err.sqlMessage);
    }
    })
}
);

router.delete('/clientes/:id',security,(req,res)=>{

    mysqlConnection.query('DELETE FROM clientes where id=?',[req.params.id],(err,result)=>{

        if(!err){
            res.status(200).send('DELETED SUCCESFULLY');
        }
        else{
            res.status(200).send(err.mysqlMessage);
        }
    });
});

module.exports=router;