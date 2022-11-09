const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.json(books);
  })
  
  .get('/:id', async (req, res) => {
    const book = await Book.getByID(req.params.id);
    const filteredAuth = book.authors.map((author) => {return { id: author.id, name: author.name };});
    book.authors = filteredAuth;
    res.json(book);
  })
;
