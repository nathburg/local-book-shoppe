const pool = require('../utils/pool');

class Book {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    this.authors = row.authors;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `SELECT * 
        FROM books`
    );
    return rows.map((bookRow) => new Book(bookRow));
  }

  static async getByID(id) {
    const { rows } = await pool.query(
      `SELECT
      books.*,
        COALESCE(
          json_agg(to_jsonb(authors))
            FILTER (WHERE authors.id is not null), '[]'
        ) as authors
    FROM
          books
          LEFT JOIN books_authors on books_authors.book_id = books.id
          LEFT JOIN authors on authors.id = books_authors.author_id
    WHERE books.id = $1
          GROUP BY books.id`, [id]
    );
    return new Book(rows[0]);
  }
}

module.exports = Book;
