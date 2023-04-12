const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const server = '127.0.0.1:27017';

mongoose.connect(`mongodb://${server}/mestodb`);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = { _id: '643491e5ea4058b58ba49db3' };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  console.log('start server');
});
