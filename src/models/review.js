const Database = require('../../database');

class Review {
  constructor(review) {
    this.id_review = review.id_review;
    this.nota = review.nota;
    this.descricao = review.descricao;
    this.id_viagem = review.id_viagem;
    this.id_usuario = review.id_usuario;
  }

  static async createReview(newReview) {
    const values = newReview;

    const db = new Database();
    const reviewId = await db.insert('Review', values);

    newReview.id_review = reviewId;
    return new Review(newReview);
  }

  static async deleteReview(reviewId, userId) {
    const query = `DELETE FROM Review WHERE id_review = ? AND id_usuario = ?`;

    const db = new Database();
    await db.raw(query, [reviewId, userId]);
  }

  static async listReviewsByTrip(tripId) {
    const query = 'SELECT * FROM Review WHERE id_viagem = ?';

    const db = new Database();
    const reviewRows = await db.raw(query, [tripId]);

    const reviews = reviewRows.map(reviewData => new Review(reviewData));
    return reviews;
  }
}

module.exports = Review;
