const dotenv = require('dotenv');
dotenv.config();

class EnvConfig {
  constructor() {
    this.port = process.env.PORT || 3000;
    this.MongoDBUrl = process.env.MONGODB_URL;
    this.jwtKey = process.env.JWT_SECRET_KEY;
    this.bucketNAME = process.env.BUCKET_NAME;
    this.iamAccessKey = process.env.IAM_ACCESS_KEY;
    this.iamSecretKey = process.env.IAM_SECRET_KEY;
  }

  getPort() {
    return this.port;
  }

  getMongodbUrl() {
    return this.MongoDBUrl;
  }

  getJwtKey() {
    return this.jwtKey;
  }

  getBucketName() {
    return this.bucketNAME;
  }
  getIamAccessKey() {
    return this.iamAccessKey;
  }
  getIamSecretKey() {
    return this.iamSecretKey;
  }
}

module.exports = new EnvConfig();
