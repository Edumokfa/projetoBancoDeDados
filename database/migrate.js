const connection = require('./connection.js');
const readFile = require('./readSqlFile.js');

let paths;
const argumentos = process.argv.slice(2);

if (argumentos.length < 1) {
  // Por padrão usa esses dois .sql
  paths = ['./database/scripts/ddl.sql', './database/scripts/seed.sql'];
}
else {
  paths = argumentos;
}

const executeQuery = (conn, query) => {
  return new Promise((resolve, reject) => {
    conn.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const runQueries = async (paths) => {
  const conn = connection();

  for (const path of paths) {
    const queries = readFile(path);

    for (const query of queries) {
      try {
        await executeQuery(conn, query);
        console.log('Query executada com sucesso:', query);
      } catch (error) {
        console.error('Erro ao executar a query:', query);
        console.error(error);
      }
    }
  }

  conn.end();
};

runQueries(paths);

module.exports = { executeQuery, runQueries };
