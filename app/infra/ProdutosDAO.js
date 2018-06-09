function ProdutosDAO(connection){
    this.connection = connection;
}

ProdutosDAO.prototype.lista = function(callback){
    this.connection.query('select * from livros',callback);
}

ProdutosDAO.prototype.salva = function(livro, callback){
    this.connection.query('insert into livros set ?',livro,callback);    
}

module.exports = function(){
    return ProdutosDAO;
}