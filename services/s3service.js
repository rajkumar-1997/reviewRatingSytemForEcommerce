const AWS = require('aws-sdk');
const fs = require('fs');
const envConfig = require('../config/envConfig');
const accessKeyId = envConfig.getIamAccessKey();
const secretAccessKey = envConfig.getIamSecretKey();
const bucketName = envConfig.getBucketName();

class S3Uploader {
  constructor() {
    // creating an instance of the S3 service object
    this.s3 = new AWS.S3({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    });
  }

  async uploadImageToS3(filePath, fileName) {
    try {
      const fileStream = fs.createReadStream(filePath);
      const uploadParams = {
        Bucket: bucketName,
        Key: fileName,
        Body: fileStream,
        ACL: 'public-read',
      };

      // Upload the image to S3
      const data = await this.s3.upload(uploadParams).promise();
      return data.Location;
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw error;
    }
  }
}

module.exports = new S3Uploader();
