const sql = require('mssql');

const config = {
  server: 'localhost',
  database: 'bancoTeste',
  options: {
    trustedConnection: true // Utilize esta opção para autenticação do Windows
  }
};

async function executeSelect() {
    try {
      await sql.connect(config);
  
      const result = await sql.query('SELECT * FROM TESTE');
  
      // Os resultados da consulta estão disponíveis em result.recordset
      console.log('Resultados:', result.recordset);
  
      sql.close();
    } catch (err) {
      console.error('Erro ao executar a consulta:', err);
    }
  }