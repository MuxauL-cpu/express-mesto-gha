const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { NotFound } = require('./utils/errors');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.use(helmet());

app.use((req, res, next) => {
  req.user = { _id: '643491e5ea4058b58ba49db3' };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(NotFound).send({ message: 'Сервер не найден.' });
});

app.listen(PORT, () => {
  console.log('start server');
});
