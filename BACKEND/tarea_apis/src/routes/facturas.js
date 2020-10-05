const express= require('express');
const router= express.Router();
const mysqlConnection=require('../db/database');
const security=require('../security/verifier');



router.get('/clientes/:id/facturas',security,(req,res)=>{

    const emp=req.params;
mysqlConnection.query('SELECT facturas.id,facturas.creado,facturas.estado,clientes.nombre FROM facturas INNER JOIN clientes ON clientes.id=facturas.cliente_id WHERE clientes.id=?',[emp.id],(err,rows,fields)=>{

    if(!err){

         res.status(200).send(rows);
    }
    else{

 console.log(err.sqlMessage);
 res.status(500).send(err.sqlMessage);
    }

});

});

router.get('/empleados/:id/facturas',security,(req,res)=>{
    const emp=req.params;

    mysqlConnection.query('SELECT facturas.id,facturas.creado,facturas.estado,empleados.nombre FROM facturas INNER JOIN empleados ON empleados.id=facturas.empleado_id WHERE empleados.id=?;',[emp.id],(err,rows,fields)=>{

        if(!err){
    res.status(200).send(rows);
        }
        else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    });
});


router.get('/facturas/:id',security,(req,res)=>{

    mysqlConnection.query('SELECT * FROM facturas where id= ?',[req.params.id],(err,rows,fields)=>{

        if(!err){
    res.status(200).send(rows);
        }
        else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    });
});

router.post('/facturas',security,(req,res)=>{

    let mp=req.body;

    mysqlConnection.query('INSERT INTO facturas (cliente_id,empleado_id,creado,estado) VALUES (?,?,?,?)',
    [mp.cliente_id,mp.empleado_id,mp.creado,mp.estado],(err,result)=>{

        if(!err){
            res.send('CREATED SUCCESFULLY')
        }
        else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    });

});

router.put('/facturas/:id',security,(req,res)=>
{
    let emp=req.body;
    let idc=req.params;
    mysqlConnection.query('UPDATE facturas set cliente_id=?, empleado_id=?, creado=?, estado=? WHERE id=?'
    ,[emp.cliente_id,emp.empleado_id,emp.creado,emp.estado,idc.id],(err,result)=>{
    if(!err){
        res.send('UPDATE SUCCEFULLY');
    }
    else{

        res.status(500).send(err.sqlMessage);
    }
    })
}
);

router.patch('/facturas/:id',security,(req,res)=>
{
    let emp=req.body;
    const idc=req.params;
    mysqlConnection.query('UPDATE facturas set  estado=? WHERE id=?'
    ,[emp.estado,idc.id],(err,result)=>{
    if(!err){
        res.send('STATE UPDATE SUCCEFULLY');
    }
    else{

        res.status(500).send(err.sqlMessage);
    }
    })
}
);


router.delete('/facturas/:id',security,(req,res)=>{

    mysqlConnection.query('UPDATE facturas set estado=? where id=?',['ANULADA',req.params.id],(err,result)=>{

        if(!err){
            res.status(200).send('DELETED SUCCESFULLY');
        }
        else{
            res.status(200).send(err.mysqlMessage);
        }
    });
});


module.exports=router;