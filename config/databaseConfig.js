const envConfig = require('./envConfig');
const mongoose = require('mongoose');
const mongodbUrl = envConfig.getMongodbUrl();

class DatabaseConfig {
  constructor() {
    this.MongoDBUrl = mongodbUrl;
  }

  async connectDb() {
    try {
      await mongoose.connect(this.MongoDBUrl);
      console.log('data base connected');
    } catch (error) {
      console.log('Database Error: ', error);
    }
  }
}

module.exports = new DatabaseConfig();
