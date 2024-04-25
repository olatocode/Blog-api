/** @format */

const express = require('express');
const dotenv = require('dotenv');
const mongoSanitize = require('express-mongo-sanitize');
const session = require('cookie-session');
const cors = require('cors');
const app = express();

const connectDB = require('./src/config/db');
const blogRouter = require('./src/routes/blog');

// connect to postgresql database
connectDB;

app.use(express.json());
dotenv.config();
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use(
//   cors({
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     preflightContinue: false,
//     optionsSuccessStatus: 200,
//   })
// );
app.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
    return res.status(200).json({});
  }
  next();
});
app.use(mongoSanitize());
const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
app.use(
  session({
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {
      secure: true,
      httpOnly: true,
      domain: 'localhost',
      path: 'http://localhost:4000/api/v1/posts',
      expires: expiryDate,
    },
  })
);
// base url
app.get('/', (req, res) => {
  res.json({
    info: 'Welcome To Blog Api',
  });
});

app.use('/api/v1', blogRouter);

// initiate express connection
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}`);
});
