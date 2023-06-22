const Database = require('../../database');

class ParadaAlreadyExistsError extends Error {
  constructor(message = 'Esta parada já existe na viagem.', errorCode = 409) {
    super(message);
    this.name = 'ParadaAlreadyExistsError';
    this.errorCode = errorCode;
  }
}

class UserNotParadaOwner extends Error {
  constructor(message = 'Você não tem permissão para apagar esta parada.', errorCode = 403) {
    super(message);
    this.name = 'UserNotParadaOwner';
    this.errorCode = errorCode;
  }
}

class Parada {
  constructor(parada) {
    this.id_viagem = parada.id_viagem;
    this.id_ponto = parada.id_ponto;
    this.nota = parada.nota;
    this.custo = parada.custo;
  }

  static async createParada(newParada) {
    const query = `SELECT id_ponto, id_viagem FROM Parada WHERE id_ponto = ? AND id_viagem = ? LIMIT 1`;
    const values = newParada;

    const db = new Database();
    const paradaExists = await db.raw(query, [values.id_ponto, values.id_viagem]);
    
    if (paradaExists.length > 0) {
      throw new ParadaAlreadyExistsError();
    }

    await db.insert('Parada', values);

    return new Parada(newParada);
  }

  static async deleteParada(tripId, turisticSpotId, userId) {
    const query_1 = `SELECT id_usuario FROM Parada JOIN Viagem USING (id_viagem) WHERE Viagem.id_viagem = ? AND id_ponto = ?`;

    const db = new Database();
  
    const paradaOwner = await db.raw(query_1, [tripId, turisticSpotId]);
    console.log(paradaOwner, userId);
    if (paradaOwner[0].id_usuario !== userId) {
      throw new UserNotParadaOwner();
    }
  
    const query_2 = 'DELETE Parada\
      FROM Parada \
      JOIN Viagem ON Parada.id_viagem = Viagem.id_viagem \
      WHERE Viagem.id_viagem = ? AND id_ponto = ? AND id_usuario = ?';
  
    const retorno = await db.raw(query_2, [tripId, turisticSpotId, userId]);
    console.log(retorno);
  }

  static async listParadasByTrip(tripId) {
    const query = 'SELECT Parada.id_viagem, Viagem.nome AS viagem, Parada.id_ponto, Ponto.nome, Ponto.localizacao, Categoria.nome \
    FROM Parada \
    JOIN Ponto_Turistico AS Ponto USING (id_ponto) \
    JOIN Categoria USING (id_categoria) \
    JOIN Viagem USING (id_viagem) \
    WHERE id_viagem = ?';

    const db = new Database();
    const paradaRows = await db.raw(query, [tripId]);
    return paradaRows;
  }
}

module.exports = [Parada, ParadaAlreadyExistsError, UserNotParadaOwner];
