const mongoose = require('../mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const authorSchema = mongoose.Schema({
  name: String,
  books: [{
    type: ObjectId,
    ref: 'Book'
  }]
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
