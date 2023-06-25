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

async function runQuery(query, res) {
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
    runQuery(query, res).then((response) => {
      if(query.includes("INSERT")){
        res.status(201).json({ retorno: "Registro inserido com sucesso" });
      } else if (query.includes("UPDATE")){
        res.status(201).json({ retorno: "Registro atualizado com sucesso" });
      } else if(query.includes("DELETE")){
        res.status(201).json({ retorno: "Registro deletado com sucesso" });
      }else {
        res.status(201).json({ registros: response });
      }
    }).catch(err =>{
      res.status(500).json({ error: err }); 
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar registro" });
  }
}

module.exports = {
  executeQuery: executeQuery,
};
