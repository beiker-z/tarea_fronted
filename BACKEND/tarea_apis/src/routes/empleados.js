
const express= require('express');
const router= express.Router();
const mysqlConnection=require('../db/database');
const security=require('../security/verifier');



router.get('/empleados',security,(req,res)=>{
mysqlConnection.query('SELECT * FROM empleados',(err,rows,fields)=>{

    if(!err){

         res.status(200).send(rows);
    }
    else{

 console.log(err.sqlMessage);
 res.status(500).send(err.sqlMessage);
    }

});

});

router.get('/empleados/:id',security,(req,res)=>{

    mysqlConnection.query('SELECT * FROM empleados where id= ?',[req.params.id],(err,rows,fields)=>{

        if(!err){
    res.status(200).send(rows);
        }
        else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    });
});

router.post('/empleados/add',security,(req,res)=>{

    let mp=req.body;

    mysqlConnection.query('INSERT INTO empleados (nombre,codigo,salario,creado_por) VALUES (?,?,?,?)',
    [mp.nombre,mp.codigo,mp.salario,mp.creado_por],(err,result)=>{

        if(!err){
            res.send('CREATED SUCCESFULLY')
        }
        else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    });

});

router.put('/empleados/:id',security,(req,res)=>
{
    let id_empleado=req.params.id;
    let emp=req.body;

    mysqlConnection.query('UPDATE empleados set nombre=?, codigo=?, salario=?, creado_por=? WHERE id=?'
    ,[emp.nombre,emp.codigo,emp.salario,emp.creado_por,emp.id],(err,result)=>{
    if(!err){
        res.send('UPDATE SUCCEFULLY');
    }
    else{

        res.status(500).send(err.sqlMessage);
    }
    })
}
);

router.delete('/empleados/:id',security,(req,res)=>{

    mysqlConnection.query('DELETE FROM empleados where id=?',[req.params.id],(err,result)=>{

        if(!err){
            res.status(200).send('DELETED SUCCESFULLY');
        }
        else{
            res.status(200).send(err.mysqlMessage);
        }
    });
});

module.exports=router;