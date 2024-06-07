const multer = require('multer');

class MulterConfig {
  constructor() {
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './upload');
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    });

    this.upload = multer({ storage: this.storage });
  }

  getUploadMiddleware() {
    return this.upload;
  }

  getStorageConfig() {
    return this.storage;
  }
}

module.exports = new MulterConfig();
