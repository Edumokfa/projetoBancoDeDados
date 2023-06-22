const Database = require('../../database');

class Midia {
  constructor(midia) {
    this.id_midia = midia.id_midia;
    this.arquivo = midia.arquivo;
    this.descricao = midia.descricao;
    this.id_viagem = midia.id_viagem;
  }

  static async createMidia(newMidia) {
    const db = new Database();
    const values = newMidia;
    const midiaId = await db.insert('Midia', values);
    newMidia.id_midia = midiaId;
    return new Midia(newMidia);
  }
}

module.exports = Midia;
