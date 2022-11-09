const pool = require('../utils/pool');

class Author {
  id;
  name;
  dob;
  pob;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
    this.books = row.books;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `SELECT *
        FROM authors`
    );
    return rows.map((authorRow) => new Author(authorRow));
  }

  static async getByID(id) {
    const { rows } = await pool.query(
      `SELECT 
      authors.*,
        COALESCE (
          json_agg(to_jsonb(books))
            FILTER (WHERE books.id is not null), '[]'
          ) as books
    FROM
      authors
        LEFT JOIN books_authors on books_authors.author_id = authors.id
        LEFT JOIN books on books.id = books_authors.book_id
    WHERE authors.id = $1
    GROUP BY authors.id`, [id]
    );
    return new Author(rows[0]);
  }
}

module.exports = Author;
