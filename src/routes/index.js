const routes = require('express').Router();
const comunicacao = require('../controllers/comunicacao_controller');

routes.get('/produtos', comunicacao.buscaProdutos);
routes.post('/criaProdutos', comunicacao.criaProduto);
routes.post('/atualizaProdutos', comunicacao.atualizaProduto);
routes.post('/deletaProdutos', comunicacao.deletaProduto);

routes.get('/clientes', comunicacao.buscaClientes);
routes.post('/criaClientes', comunicacao.criaCliente);
routes.post('/atualizaClientes', comunicacao.atualizaCliente);
routes.post('/deletaClientes', comunicacao.deletaCliente);

routes.get('/descontos', comunicacao.buscaDescontos);
routes.post('/criaDescontos', comunicacao.criaDesconto);
routes.post('/atualizaDescontos', comunicacao.atualizaDesconto);
routes.post('/deletaDescontos', comunicacao.deletaDesconto);

routes.get('/compras', comunicacao.buscaCompras);
routes.post('/realizarCompra', comunicacao.realizaCompra);
routes.get('/comprasDoCliente', comunicacao.buscaComprasDoCliente);
routes.get('/comprasDoPeriodo', comunicacao.buscaComprasPeriodo);

routes.get('/itensCompra', comunicacao.buscaItensCompra);
routes.post('/inserirItem', comunicacao.inserirItens);

module.exports = routes; 