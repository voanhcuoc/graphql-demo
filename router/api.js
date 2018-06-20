const express = require('express');
const { buildSchema } = require('graphql');
const graphqlMiddleware = require('express-graphql');

const resolver = require('../graphql-resolver');

const schema = buildSchema(`
  type Query {
    book(_id: ID): Book
    author(_id: ID): Author
    books: [Book]
    authors: [Author]
  }

  type Mutation {
    createBook(input: BookInput): Book
    updateBook(input: BookInput): Book
    deleteBook(_id: ID): Book

    createAuthor(name: String): Author
    updateAuthor(input: AuthorInput): Author
    deleteAuthor(_id: ID): Author
  }

  input BookInput {
    isbn: String
    name:String
    authorID: ID
  }

  type Book {
    _id: ID
    name: String!
    isbn: String!
    author: Author!
  }

  input AuthorInput {
    name: String
    bookIDs: [ID]
  }

  type Author {
    _id: ID
    name: String!
    books: [Book]
  }
`);

const router = express.Router();

const endpoint = graphqlMiddleware({
  schema,
  graphiql: true,
  rootValue: resolver
});

router.get('/', endpoint);
router.post('/', endpoint);

module.exports = router;
