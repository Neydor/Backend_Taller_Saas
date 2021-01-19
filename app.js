//Conexion a la BD
//ejecutar con nodemon

const mysql = require('mysql');

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
conexion.end();