require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const connectDB = require('./db/connect');

const notFoundMiddles = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const products = require('./routes/products');

app.get('/', (req, res) => {
  res.send('store api');
});

app.use('/api/v1/products', products);

app.use(notFoundMiddles);
app.use(errorHandlerMiddleware);

const PORT = process.envPORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
