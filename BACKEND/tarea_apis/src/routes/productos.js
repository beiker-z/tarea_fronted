const express= require('express');
const router= express.Router();
const mysqlConnection=require('../db/database');
const security=require('../security/verifier');


router.get('/productos',security,(req,res)=>{
mysqlConnection.query('SELECT * FROM productos',(err,rows,fields)=>{

    if(!err){

         res.status(200).send(rows);
    }
    else{

 console.log(err.sqlMessage);
 res.status(500).send(err.sqlMessage);
    }

});

});

router.get('/productos/:id',security,(req,res)=>{

    mysqlConnection.query('SELECT * FROM productos where id= ?',[req.params.id],(err,rows,fields)=>{

        if(!err){
    res.status(200).send(rows);
        }
        else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    });
});

router.post('/productos',security,(req,res)=>{

    let mp=req.body;

    mysqlConnection.query('INSERT INTO productos (nombre,precio,creado_por) VALUES (?,?,?)',
    [mp.nombre,mp.precio,mp.creado_por],(err,result)=>{

        if(!err){
            res.send('CREATED SUCCESFULLY')
        }
        else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    });

});

router.put('/productos/:id',security,(req,res)=>
{
    let product_id=req.params.id;
    let emp=req.body;

    mysqlConnection.query('UPDATE productos set nombre=?, precio=?,creado_por=? WHERE id=?'
    ,[emp.nombre,emp.precio,emp.creado_por,product_id],(err,result)=>{
    if(!err){
        res.send('UPDATE SUCCEFULLY');
    }
    else{

        res.status(500).send(err.sqlMessage);
    }
    })
}
);

router.delete('/productos/:id',security,(req,res)=>{

    mysqlConnection.query('DELETE FROM productos where id=?',[req.params.id],(err,result)=>{

        if(!err){
            res.status(200).send('DELETED SUCCESFULLY');
        }
        else{
            res.status(200).send(err.mysqlMessage);
        }
    });
});

module.exports=router;