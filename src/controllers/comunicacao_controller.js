const sql = require("mssql");
require("msnodesqlv8");
const { executeQuery } = require("../dbConnection.js");

//Produtos
exports.buscaProdutos = async function (req, res) {
  executeQuery("SELECT * FROM PRODUTOS", res);
};

exports.criaProduto = async function (req, res) {
  const query = `INSERT INTO PRODUTOS (PROD_NOME, PROD_PRECO) VALUES ('${req.body.prodNome}', ${req.body.prodPreco})`;
  console.log(query);
  executeQuery(query, res);
};

exports.atualizaProduto = async function (req, res) {
  const prodId = req.body.prodId;
  const updates = [];

  if (req.body.prodNome) {
    updates.push(`PROD_NOME = '${req.body.prodNome}'`);
  }

  if (req.body.prodPreco) {
    updates.push(`PROD_PRECO = ${req.body.prodPreco}`);
  }

  if (updates.length === 0) {
    res
      .status(400)
      .json({ error: "Nenhum valor para atualizar foi fornecido" });
    return;
  }
  const query = `UPDATE PRODUTOS SET ${updates.join(
    ", "
  )} WHERE PROD_ID = ${prodId}`;
  executeQuery(query, res);
};

//Clientes
exports.buscaClientes = async function (req, res) {
  executeQuery("SELECT * FROM CLIENTES", res);
};

exports.criaCliente = async function (req, res) {
  const query = `INSERT INTO CLIENTES (CLI_NOME, CLI_SOBRENOME, CLI_CPF, CLI_CELULAR, CLI_TELEFONE) 
  VALUES  ('${req.body.cliNome}', '${req.body.cliSobrenome}', '${req.body.cliCpf}', '${req.body.cliCelular}', '${req.body.cliTelefone}')`;
  console.log(query);
  executeQuery(query, res);
};

exports.atualizaCliente = async function (req, res) {
  const cliId = req.body.cliId;
  const updates = [];
  
  if (req.body.cliNome) {
    updates.push(`CLI_NOME = '${req.body.cliNome}'`);
  }

  if (req.body.cliSobrenome) {
    updates.push(`CLI_SOBRENOME = '${req.body.cliSobrenome}'`);
  }

  if (req.body.cliCpf) {
    updates.push(`CLI_CPF = '${req.body.cliCpf}'`);
  }

  if (req.body.cliCelular) {
    updates.push(`CLI_CELULAR = '${req.body.cliCelular}'`);
  }

  if (req.body.cliTelefone) {
    updates.push(`CLI_TELEFONE = '${req.body.cliTelefone}'`);
  }

  if (updates.length === 0) {
    res
      .status(400)
      .json({ error: "Nenhum valor para atualizar foi fornecido" });
    return;
  }
  const query = `UPDATE CLIENTES SET ${updates.join(
    ", "
  )} WHERE CLI_ID = ${cliId}`;
  console.log(query);
  executeQuery(query, res);
};

//Descontos
exports.buscaDescontos = async function (req, res) {
  executeQuery("SELECT * FROM DESCONTOS", res);
};

//Compras
exports.buscaCompras = async function (req, res) {
  executeQuery("SELECT * FROM COMPRAS", res);
};

//Itens de compra
exports.buscaItensCompra = async function (req, res) {
  executeQuery("SELECT * FROM ITENS_COMPRA", res);
};
