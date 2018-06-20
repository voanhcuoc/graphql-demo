const morgan = require('morgan');

const app = require('./app');

app.use(morgan('dev'));
const port = parseInt(process.env.PORT || '3000', 10);

app.listen(port);
