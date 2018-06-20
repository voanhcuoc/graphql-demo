const Book = require('./models/book');
const Author = require('./models/author');

module.exports = {
  book: (args) => new Promise((resolve, reject) => {
    Book.findById(args._id).populate('author').exec((err, book) => {
      if (err) return reject(err);
      resolve(book);
    });
  }),
  author: (args) => new Promise((resolve, reject) => {
    Author.findById(args._id).populate('books').exec((err, author) => {
      if (err) return reject(err);
      resolve(author);
    });
  }),
  books: () => new Promise((resolve, reject) => {
    Book.find().populate('author').exec((err, books) => {
      if (err) return reject(err);
      console.log(books);
      resolve(books);
    });
  }),
  authors: () => new Promise((resolve, reject) => {
    Author.find().populate('books').exec((err, authors) => {
      if (err) return reject(err);
      resolve(authors);
    });
  }),
  createBook: (args) => new Promise((resolve, reject) => {
    const { isbn, name, authorID } = args.input;
    Author.findById(authorID, (err, author) => {
      if (err) return reject(err);
      Book.create({ isbn, name, author: authorID }, (err, book) => {
        if (err) return reject(err);
        console.log(book);
        author.save((err, author) => {
          book.author = author;
          resolve(book);
        })
      });
    });
  }),
  createAuthor: (args) => new Promise((resolve, reject) => {
    Author.create({ name: args.name }, (err, author) => {
      if (err) return reject(err);
      resolve(author);
    });
  }),
  updateBook: (args) => new Promise((resolve, reject) => {
    const { isbn, name, authorID } = args.input;
    Book.findById((err, book) => {
      if (err) return reject(err);
      if (name) book.name = name;
      if (authorID) book.author = authorID;
      book.save((err, book) => {
        if (err) return reject(err);
        resolve(book);
      });
    });
  }),
  updateAuthor: (args) => new Promise((resolve, reject) => {
    const { name, bookIDs } = args.input;
    Author.findById((err, author) => {
      if (err) return reject(err);
      Promise.all(bookIDs.map(bookID => new Promise((resolve, reject) => {
        Book.findById(bookID, (err) => {
          if (err) return reject(err);
          resolve(bookID);
        });
      })))
      .catch(reject)
      .then((bookIDs) => {
        if (bookIDs) author.bookIDs = bookIDs;
        return author;
      })
      .then((author) => {
        if (name) author.name = name;
        return author;
      })
      .then((author) => {
        author.save((err, author) => {
          if (err) return reject(err);
          resolve(author);
        })
      });
    });
  })
}
