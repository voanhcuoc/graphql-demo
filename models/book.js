const mongoose = require('../mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = mongoose.Schema({
  name: String,
  isbn: String,
  author: {
    type: ObjectId,
    ref: 'Author'
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
