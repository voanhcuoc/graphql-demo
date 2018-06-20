const express = require('express');
const { buildSchema } = require('graphql');
const graphqlMiddleware = require('express-graphql');

const resolver = require('../graphql-resolver');

const schema = buildSchema(`
  type Query {
    book(isbn: String): Book
    author(id: ID): Author
  }

  type Book {
    name: String!
    isbn: String!
    author: Author!
  }

  type Author {
    name: String!
    books: [Book]
  }
`);

const router = express.Router();

router.post('/', graphqlMiddleware({
  schema,
  graphiql: true,
  rootValue: resolver
}));

module.exports = router;
