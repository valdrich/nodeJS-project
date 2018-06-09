module.exports = function(app){   
    var listaProdutos = function(req,res){
            var connection = app.infra.connectionFactory();
            var produtosDAO = new app.infra.ProdutosDAO(connection);
                produtosDAO.lista(function(erros,resultados){
                    res.format({
                        html: function(){
                            res.render('produtos/lista',{lista:resultados});
                        },
                        json: function(){                            
                                res.json(resultados);                            
                        }
                    })
                    
                });
            connection.end();
    };    

    app.get('/produtos',listaProdutos);

    app.get('/produtos/form', function(req, res){
        res.render('produtos/form');
    });

    app.post('/produtos', function(req,res){
        var produto = req.body; //vem do html
        var validadorTitulo = req.assert('titulo', 'Título é obrigatório');
        validadorTitulo.notEmpty();

        var erros = req.validationErrors();
        if(erros){
            res.render('produtos/form');
            return;
        };

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.salva(produto, function(erros,resultados){
              res.redirect('/produtos'); //pra evitar problemas com F5 sempre colocar o redirect depois do post
        });
    });   

    app.post('/produtos/json', function(req,res){
        var produto = req.body; //vem do html
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.salva(produto, function(erros,resultados){
              res.json(resultados); //envia a resposta como json
        });
    }); 
}