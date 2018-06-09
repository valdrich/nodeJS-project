var mysql = require('mysql'); 

function createDbConnection(){
    return mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'casadocodigo'
    });
}

//wrapper função que embrulha a outra função
module.exports = function(){
    return createDbConnection;
}