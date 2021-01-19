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


// consulta a la BD
app.get('/',(req,res)=> {
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

