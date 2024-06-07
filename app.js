const express = require('express');
const cors = require('cors');
const envConfig = require('./config/envConfig');
const databaseConfig = require('./config/databaseConfig');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/review', reviewRoutes);
app.get('/', (req, res) => {
  res.status(200).send({ message: 'hello from express app' });
});

const port = envConfig.getPort();

const server = async () => {
  try {
    await databaseConfig.connectDb();
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.log('Error in server start: ', error);
  }
};
server();
