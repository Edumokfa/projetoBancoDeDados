const routes = require('express').Router();
const comunicacao = require('../controllers/comunicacao_controller');

routes.get('/produtos', comunicacao.buscaProdutos); 
routes.post('/criaProdutos', comunicacao.criaProduto);
routes.post('/atualizaProdutos', comunicacao.atualizaProduto); 

routes.get('/clientes', comunicacao.buscaClientes); 
routes.post('/criaClientes', comunicacao.criaCliente); 
routes.post('/atualizaClientes', comunicacao.atualizaCliente); 

routes.get('/compras', comunicacao.buscaCompras); 

routes.get('/itens_compra', comunicacao.buscaItensCompra); 

routes.get('/descontos', comunicacao.buscaDescontos); 

module.exports = routes; 