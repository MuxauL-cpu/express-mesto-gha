const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const { errorHandler } = require('./middlewares/errorHandler');
const { createUserValidation } = require('./utils/validations');

const { PORT = 3000 } = process.env;

require('dotenv').config();

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

app.post('/signin', login);
app.post('/signup', createUserValidation, createUser);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('start server');
});
