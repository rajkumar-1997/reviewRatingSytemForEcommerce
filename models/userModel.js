const mongoose = require('mongoose');
const { Schema } = mongoose;
class UserSchema {
  constructor() {
    this.schema = new Schema(
      {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
      },
      {
        timeStamps: true,
      }
    );
  }

  getModel() {
    return mongoose.model('User', this.schema);
  }
}

const UserModel = new UserSchema().getModel();
module.exports = UserModel;
