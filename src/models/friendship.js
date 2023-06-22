const Database = require('../../database');

class Friendship {
  constructor(friendship) {
    this.id_amizade = friendship.id_amizade;
    this.data_inicio_amizade = friendship.data_inicio_amizade;
    this.id_usuario_1 = friendship.id_usuario_1;
    this.id_usuario_2 = friendship.id_usuario_2;
  }

  static async createFriendship(newFriendship) {
    const values = newFriendship;
    const currentDate = new Date();
    const dbFormattedDate = currentDate.toISOString().split('T')[0];
    values['data_inicio_amizade'] = dbFormattedDate;

    const db = new Database();
    const friendshipId = await db.insert('Amizade', values);

    newFriendship.id_amizade = friendshipId;
    return new Friendship(newFriendship);
  }

  static async getFriendshipById(friendshipId, userId) {
    const query = 'SELECT * FROM Amizade WHERE id_amizade = ? and id_usuario_1 = ?';

    const db = new Database();
    const friendshipRows = await db.raw(query, [friendshipId, userId]);

    if (friendshipRows.length === 0) {
      return null;
    }
    const friendshipData = friendshipRows[0];
    return new Friendship(friendshipData);
  }

  static async deleteFriendship(friendshipId, userId) {
    const query = 'DELETE FROM Amizade WHERE id_amizade = ? AND id_usuario = ?';

    const db = new Database();
    await db.raw(query, [friendshipId, userId]);
  }
}

module.exports = Friendship;
