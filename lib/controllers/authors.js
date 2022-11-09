const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .get('/', async (req, res) => {
    const authors = await Author.getAll();
    const filtered = authors.map((author) => {return { id: author.id, name: author.name };});
    res.json(filtered);
  });
