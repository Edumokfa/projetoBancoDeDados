const sql = require('mssql');
require("msnodesqlv8");

const config = {
  server: 'localhost',
  database: 'bancoTeste',
  driver: "msnodesqlv8",
  user: "admin",
  password: "admin",
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
    
  }
};

async function executeSelect() {
    try {
      await sql.connect(config);
      const result = await sql.query('SELECT * FROM TESTE');
      return result.recordset;
    } catch (err) {
        console.error('Erro ao executar a consulta:', err);
    } finally {
        sql.close();
    }
  }

  async function executeInsert() {
    try {
      await sql.connect(config);
      //await sql.query('INSERT INTO TESTE VALUES (6)');
      sql.close();
    } catch (err) {
      console.error('Erro ao executar a consulta:', err);
    }
  }


exports.create = async function(req, res) {
    try {
        executeSelect().then(response => {
            res.status(201).json({ registros: response });
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};