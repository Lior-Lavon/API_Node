const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const AuthorSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// middleware that will run before the user document is created
// hash the password before storing it
AuthorSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = this.encryptPassword(this.password);
  next();
});

AuthorSchema.methods = {
  // check the password on signin
  // Takes in a plainTextPassword and return 'bcrypt.compareSync' witch takes the plaintextpassword -> hash It and see if it match the password that was saved with the current user object (this.password)
  // plainTextPword input tpassword to compare
  // this.password the returened hashed password from the db on the current user object

  authenticate: (plainTextPword, hashedPassword) => {
    return bcrypt.compareSync(plainTextPword, hashedPassword);
  },
  // hash a password
  encryptPassword: (plainTextPword) => {
    if (!plainTextPword) {
      return '';
    }
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainTextPword, salt);
  },
};

module.exports = mongoose.model('author', AuthorSchema);
