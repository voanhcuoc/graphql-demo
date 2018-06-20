const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/graphqlDemo');
const db = mongoose.connection;
db.on('error', (err) => {
  console.error(err);
});
db.once('open', () => {
  console.log('Mongo connected succsessfully!');
});

module.exports = mongoose;
