var mysql = require('mysql'); 

function createDbConnection(){
    if(!process.env.NODE_ENV){
        return mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'casadocodigo'
        });
    }

    if(process.env.NODE_ENV == 'test'){
        return mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'casadocodigo_test'
        });
    }
    
}

//wrapper função que embrulha a outra função
module.exports = function(){
    return createDbConnection;
}