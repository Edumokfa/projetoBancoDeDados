const sql = require("mssql");
require("msnodesqlv8");

const config = {
  server: "localhost",
  database: "MENIN_BD",
  driver: "msnodesqlv8",
  user: "admin",
  password: "admin",
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

async function runQuery(query) {
  try {
    await sql.connect(config);
    const result = await sql.query(query);
    return result.recordset;
  } catch (err) {
    throw err;
  } finally {
    sql.close();
  }
}

async function executeQuery(query, res) {
  try {
    runQuery(query)
      .then((response) => {
        res.status(201).json({ registros: response });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar registro" });
  }
}

//Produtos
async function executaProcedureProduto(operacao, req, res) {
  try {
    await sql.connect(config);

    const request = new sql.Request();

    request.input("OPERACAO", sql.VarChar(45), operacao);
    request.input("PROD_ID", sql.Int, req.body.prodId);
    request.input("PROD_NOME", sql.VarChar(45), req.body.prodNome);
    request.input("PROD_PRECO", sql.Decimal(10, 3), req.body.prodPreco);
    request.output("RESPONSE", sql.VarChar(100));

    const result = await request.execute("ALTERAR_PRODUTOS");
    const response = result.output.RESPONSE;
    res.status(201).json({ retorno: response });
  } catch (error) {
    console.error("Erro:", error.message);
    res.status(201).json({ erro: error.message });
  } finally {
    sql.close();
  }
}

exports.buscaProdutos = async function (req, res) {
  executeQuery("SELECT * FROM PRODUTOS", res);
};

exports.criaProduto = async function (req, res) {
  executaProcedureProduto("INSERT", req, res);
};

exports.atualizaProduto = async function (req, res) {
  executaProcedureProduto("UPDATE", req, res);
};

exports.deletaProduto = async function (req, res) {
  executaProcedureProduto("DELETE", req, res);
};

//Clientes
async function executaProcedureCliente(operacao, req, res) {
  try {
    await sql.connect(config);

    const request = new sql.Request();

    request.input("OPERACAO", sql.VarChar(45), operacao);
    request.input("CLI_ID", sql.Int, req.body.cliId);
    request.input("CLI_NOME", sql.VarChar(45), req.body.cliNome);
    request.input("CLI_SOBRENOME", sql.VarChar(45), req.body.cliSobrenome);
    request.input("CLI_CPF", sql.VarChar(13), req.body.cliCpf);
    request.input("CLI_CELULAR", sql.VarChar(13), req.body.cliCelular);
    request.input("CLI_TELEFONE", sql.VarChar(13), req.body.cliTelefone);
    request.output("RESPONSE", sql.VarChar(100));

    const result = await request.execute("ALTERAR_CLIENTES");
    const response = result.output.RESPONSE;
    res.status(201).json({ retorno: response });
  } catch (error) {
    console.error("Erro:", error.message);
    res.status(201).json({ erro: error.message });
  } finally {
    sql.close();
  }
}

exports.buscaClientes = async function (req, res) {
  executeQuery("SELECT * FROM CLIENTES", res);
};

exports.criaCliente = async function (req, res) {
  executaProcedureCliente("INSERT", req, res);
};

exports.atualizaCliente = async function (req, res) {
  executaProcedureCliente("UPDATE", req, res);
};

exports.deletaCliente = async function (req, res) {
  executaProcedureCliente("DELETE", req, res);
};

//Descontos
async function executaProcedureDesconto(operacao, req, res) {
  try {
    await sql.connect(config);

    const request = new sql.Request();

    request.input("OPERACAO", sql.VarChar(45), operacao);
    request.input("DESC_ID", sql.Int, req.body.descId);
    request.input("DESC_DATA_INICIAL", sql.DateTime, req.body.descDataInicial);
    request.input("DESC_DATA_FINAL", sql.DateTime, req.body.descDataFinal);
    request.input("DESC_ID_PROD", sql.Int, req.body.descIdProd);
    request.input("DESC_PERCENTUAL", sql.Int, req.body.descPercentual);
    request.output("RESPONSE", sql.VarChar(100));

    const result = await request.execute("ALTERAR_DESCONTOS");
    const response = result.output.RESPONSE;
    res.status(201).json({ retorno: response });
  } catch (error) {
    console.error("Erro:", error.message);
    res.status(201).json({ erro: error.message });
  } finally {
    sql.close();
  }
}

exports.buscaDescontos = async function (req, res) {
  executeQuery("SELECT * FROM DESCONTOS", res);
};

exports.criaDesconto = async function (req, res) {
  executaProcedureDesconto("INSERT", req, res);
};

exports.atualizaDesconto = async function (req, res) {
  executaProcedureDesconto("UPDATE", req, res);
};

exports.deletaDesconto = async function (req, res) {
  executaProcedureDesconto("DELETE", req, res);
};

//Compras
async function executaProcedureRealizarCompra(req, res) {
  try {
    await sql.connect(config);

    const request = new sql.Request();

    request.input("COM_ID_CLIENTE", sql.Int, req.body.comIdCliente);
    request.output("RESPONSE", sql.VarChar(100));

    const result = await request.execute("REALIZAR_COMPRA");
    const response = result.output.RESPONSE;
    res.status(201).json({ retorno: response });
  } catch (error) {
    console.error("Erro:", error.message);
    res.status(201).json({ erro: error.message });
  } finally {
    sql.close();
  }
}

async function executaProcedureComprasDoCliente(req, res) {
  try {
    await sql.connect(config);

    const request = new sql.Request();

    request.input("CLIENTE_ID", sql.Int, req.body.idCliente);
    request.output("RESPONSE", sql.VarChar(100));

    const result = await request.execute("BUSCAR_TODAS_AS_COMPRAS_DO_CLIENTE");
    const response = result.output.RESPONSE;
    res.status(201).json({ compras: result.recordset, response: response });
  } catch (error) {
    console.error("Erro:", error.message);
    res.status(201).json({ erro: error.message });
  } finally {
    sql.close();
  }
}

exports.buscaCompras = async function (req, res) {
  executeQuery("SELECT * FROM COMPRAS", res);
};

exports.realizaCompra = async function (req, res) {
  executaProcedureRealizarCompra(req, res);
};

exports.buscaComprasDoCliente = async function (req, res) {
  executaProcedureComprasDoCliente(req, res);
};

//Itens de compra
async function executaProcedureInserirItens(req, res) {
  try {
    await sql.connect(config);

    const request = new sql.Request();

    request.input("ITEC_ID_COMPRA", sql.Int, req.body.itecIdCompra);
    request.input("ITEC_ID_PRODUTO", sql.Int, req.body.itecIdProduto);
    request.input("ITEC_QNTD", sql.Int, req.body.itecQnt);
    request.output("RESPONSE", sql.VarChar(100));

    const result = await request.execute("INSERIR_ITENS");
    const response = result.output.RESPONSE;
    res.status(201).json({ retorno: response });
  } catch (error) {
    console.error("Erro:", error.message);
    res.status(201).json({ erro: error.message });
  } finally {
    sql.close();
  }
}

async function executaProcedureComprasDoPeriodo(req, res) {
  try {
    await sql.connect(config);

    const request = new sql.Request();

    request.input("DATA_INICIAL", sql.DateTime, req.body.dataInicial);
    request.input("DATA_FINAL", sql.DateTime, req.body.dataFinal);
    request.output("RESPONSE", sql.VarChar(100));

    const result = await request.execute("BUSCAR_TODAS_AS_COMPRAS_DO_PERIODO");
    const response = result.output.RESPONSE;
    res.status(201).json({ compras: result.recordset, response: response });
  } catch (error) {
    console.error("Erro:", error.message);
    res.status(201).json({ erro: error.message });
  } finally {
    sql.close();
  }
}

exports.buscaComprasPeriodo = async function (req, res) {
  executaProcedureComprasDoPeriodo(req, res);
};

exports.buscaItensCompra = async function (req, res) {
  executeQuery("SELECT * FROM ITENS_COMPRA", res);
};

exports.inserirItens = async function (req, res) {
  executaProcedureInserirItens(req, res);
};

