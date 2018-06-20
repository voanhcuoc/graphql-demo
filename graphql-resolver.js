const Book = require('./models/book');
const Author = require('./models/author');

module.exports = {
  book: (args) => new Promise((resolve, reject) => {
    Book.where({ isbn: args.isbn }).findOne((err, book) => {
      if (err) reject(err);
      resolve(book);
    });
  }),
  author: (args) => new Promise((resolve, reject) => {
    Author.findById(args.id, (err, author) => {
      if (err) reject(err);
      resolve(author);
    });
  })
}
