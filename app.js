//ejecutar con nodemon de ser posible

const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
//en caso de desplegarlo
const PORT = process.env.PORT || 3128;
const app = express();
app.use(bodyParser.json());


//--------------- Conexion con la BD -----------------------------------------
const conexion = mysql.createConnection({
    host: 'bhe1o4gbdndj06xzaufj-mysql.services.clever-cloud.com',
    user: 'ujlakyrkypsopo9y',
    password: 'JHWjIqZt3Tzr1ptaV2wr',
    database: 'bhe1o4gbdndj06xzaufj'
});

conexion.connect( function (error)  {

    if (error) {throw error;}
    else{console.log('Conexion establecida');}

});












//---------------------------------------------------------   crud ESTACIONES  ___________________________________________________________________________




// traer todas las estaciones
app.get('/estaciones',(req,res)=> {
    conexion.query('SELECT * FROM estacion',function(error,results,fields){

        if (error) 
        throw error;
        if (results.length > 0){
            res.json(results);
        }
        else {
            res.send('No hay registros en la BD');
        }
    
    });

});
// traer una estacion segun el id
app.get('/estaciones/:estacion_id',(req,res)=> {

    const {estacion_id} = req.params
    const sql = `SELECT * FROM estacion WHERE estacion_id = ${estacion_id}`;

    conexion.query(sql,function(error,results,fields){

        if (error) 
        throw error;
        if (results.length > 0){
            res.json(results);
        }
        else {
            res.send('no hay conincidencias');
        }
    
    });

});

app.post('/estaciones',(req,res)=> {

    const sql = 'INSERT INTO estacion SET ?';
    const estacion_obj = {
        //"estacion_id": autoincremental,
        "estacion_nombre": req.body.estacion_nombre,
        "estacion_direccion": req.body.estacion_direccion,
        "estacion_telefono": req.body.estacion_telefono,
        "estacion_latitud": req.body.estacion_latitud,
        "estacion_longitud": req.body.estacion_longitud
    };

    conexion.query(sql,estacion_obj,function(error){

    if (error) throw error;
        res.send('Estacion Creada');
    });

});
// Actualizar una estacion segun un Id, Hacer las validaciones por GUI
app.put('/estaciones/:estacion_id',(req,res)=> {
   
        const{estacion_id} = req.params;
        const{estacion_nombre,estacion_direccion,estacion_telefono,estacion_latitud,estacion_longitud } = req.body;
  
        const sql = `UPDATE estacion SET 
                            estacion_nombre ='${estacion_nombre}', 
                            estacion_direccion='${estacion_direccion}',
                            estacion_telefono='${estacion_telefono}',
                            estacion_latitud=${estacion_latitud},
                            estacion_longitud=${estacion_longitud}            
                     WHERE estacion_id = '${estacion_id}' `;

    conexion.query(sql,function(error){

    if (error) throw error;
        res.send('Estacion Actualizada!');
    });


});

app.delete('/estaciones/:estacion_id',(req,res)=> {
   
    const {estacion_id} = req.params
    const sql = `DELETE FROM estacion WHERE estacion_id = ${estacion_id}`;

    conexion.query(sql,function(error,results,fields){

        if (error) throw error;
            res.send('Estacion Eliminada!');
        });

});







//---------------------------------------------------------   FIN ESTACIONES  ___________________________________________________________________________





//---------------------------------------------------------   crud USUARIOS  ___________________________________________________________________________




// traer todos los usuarios
app.get('/usuarios',(req,res)=> {
    conexion.query('SELECT * FROM Usuarios',function(error,results,fields){

        if (error) 
        throw error;
        if (results.length > 0){
            res.json(results);
        }
        else {
            res.send('No hay registros en la BD de usuario');
        }
    
    });

});
// traer un usuario segun el id
app.get('/usuarios/:ID_Usuario',(req,res)=> {

    const {ID_Usuario} = req.params
    const sql = `SELECT * FROM Usuarios WHERE ID_Usuario = ${ID_Usuario}`;

    conexion.query(sql,function(error,results,fields){

        if (error) 
        throw error;
        if (results.length > 0){
            res.json(results);
        }
        else {
            res.send('no hay coincidencias');
        }
    
    });

});
// crear un usuario
app.post('/usuarios',(req,res,netx)=> {

    const sql = 'INSERT INTO Usuarios SET ?';
    /*let codificado = require('bcrypt-nodejs') 
    const password = req.body.Contrasenia;

    codificado.genSalt(10,(err,salt) => {
        if (err)throw err;
        codificado.hash(password,salt,null ,(err,hash)=>{
            if (err) throw err; 
            req.body.Contrasenia = hash;           
        })
    }) */

    const estacion_obj = {
        //"estacion_id": autoincremental,
        "Nombre_Usuario": req.body.Nombre_Usuario,
        "Documento": req.body.Documento,
        "Correo": req.body.Correo,
        "Contrasenia": req.body.Contrasenia,
        "Sexo": req.body.Sexo,
        "Telefono": req.body.Telefono,
        "Residencia": req.body.Residencia,
        "Tipo_Documento_ID": req.body.Tipo_Documento_ID,
        "Nacionalidad_ID": req.body.Nacionalidad_ID
    };

    conexion.query(sql,estacion_obj,function(error){

    if (error) throw error;
        res.send('Usuario Creado');
    });

});
// Actualizar una estacion segun un Id, Hacer las validaciones por GUI
app.put('/usuarios/:ID_Usuario',(req,res)=> {
   
        const{ID_Usuario} = req.params;
        const{
            Nombre_Usuario,
            Documento,
            Correo,
            Contrasenia,
            Sexo,
            Telefono,
            Residencia,
            Tipo_Documento_ID,
            Nacionalidad_ID
        } = req.body;
        
        const sql = `UPDATE Usuarios SET 
                             Nombre_Usuario ='${Nombre_Usuario}', 
                             Documento ='${Documento}', 
                             Correo ='${Correo}', 
                             Contrasenia ='${Contrasenia}', 
                             Sexo ='${Sexo}', 
                             Telefono ='${Telefono}', 
                             Residencia ='${Residencia}', 
                             Tipo_Documento_ID ='${Tipo_Documento_ID}', 
                             Documento=${Nacionalidad_ID}            
                     WHERE ID_Usuario = '${ID_Usuario}' `;

    conexion.query(sql,function(error){

    if (error) throw error;
        res.send('Usuario Actualizado!');
    });


});

app.delete('/usuarios/:ID_Usuario',(req,res)=> {
   
    const {ID_Usuario} = req.params
    const sql = `DELETE FROM Usuarios WHERE ID_Usuario = ${ID_Usuario}`;

    conexion.query(sql,function(error,results,fields){

        if (error) throw error;
            res.send('Usuario Eliminado!');
        });

});







//---------------------------------------------------------   FIN ESTACIONES  ___________________________________________________________________________





/*
conexion.query('SELECT * FROM estacion',function(error,results,fields){

    if (error) 
    throw error;
    results.forEach(result => {
        console.log(result);
    });

});
conexion.end(); */
app.listen(PORT,()=> console.log('servicio corriendo por el puerto ${PORT}'));

