const express = require('express');
const morgan = require('morgan');
const app = express();
const routes = require('./routes');

// middlewares
app.use(express.json());
app.use(morgan('tiny'));

// routes
app.use('/api', routes);

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;

// const express = require('express');
// const morgan = require('morgan');
// const app = express();

// // middlewares
// app.use(express.json());
// app.use(morgan('tiny'));

// // routes
// app.get('/', (req, res) => {
//   res.send('Hello, world!');
// });

// // error handling
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });

// module.exports = app;