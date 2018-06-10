var express = require('../config/express')();
var request = require('supertest')(express);

describe('ProdutosController', function(){

    /*beforeEach(function(done){
        var conn = express.infra.connectionFactory();
        conn.query('delete from produtos', function(ex,result){
            if(!ex){
                done();
            }
        })
    }); */  

    it('listagem json', function(done){

        request.get('/produtos')
        .set('Accept','application/json')
        .expect('Content-Type',/json/) //expressão regular no JS é com / / portanto, tem que ter isso no retorno
        .expect(200,done);
    });

    it('#cadastro produto com dados inválidos', function(done){
        request.post('/produtos')
        .send({titulo:'',descricao:'novo livro'})
        .expect(400,done);
    });

    it('#cadastro produto com dados validos', function(done){
        request.post('/produtos')
        .send({titulo:'mocha',descricao:'descricao do mocha',preco:20.50})
        .expect(302,done);
    });

});