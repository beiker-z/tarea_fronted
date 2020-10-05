const express= require('express');
const router= express.Router();
const mysqlConnection=require('../db/database');
const security=require('../security/verifier');





router.get('/facturas/:id/productos',security,(req,res)=>{

    const emp=req.params;
mysqlConnection.query('SELECT facturas.id,pf.cantidad,productos.nombre,pf.subtotal,facturas.estado FROM facturas INNER JOIN productos_facturas AS pf ON pf.factura_id=facturas.id INNER JOIN productos ON pf.producto_id=productos.id WHERE facturas.id=?'
,[emp.id],(err,rows,fields)=>{

    if(!err){

         res.status(200).send(rows);
    }
    else{

 console.log(err.sqlMessage);
 res.status(500).send(err.sqlMessage);
    }

});

});

router.post('/facturas/:id/detalle',security,(req, res) =>{
    let factura_id = req.params.id;
    let p_factura = req.body;
 mysqlConnection.query('INSERT INTO productos_facturas(factura_id, producto_id, cantidad, subtotal, creado_por) VALUES(?, ?, ?, ?, ?)',
            [factura_id, p_factura.producto_id, p_factura.cantidad, p_factura.subtotal, p_factura.creado_por], (error,result) => {
                if (!error) {
                    res.send('Creado exitosamente');
                } else {
                    console.log(error);
                }
            });
    });


router.delete('/facturas/:id/:idproducto',security,(req,res)=>{
let factura_id = req.params.id;
let producto_id = req.query.id_producto;
    mysqlConnection.query('DELETE FROM productos_facturas WHERE factura_id = ? AND producto_id = ?',
        [factura_id, producto_id], (error,result) => {
            if (!error) {
                res.send('Eliminado exitosamente');
            } else {
                console.log(error);
            }
        });
});


module.exports=router;