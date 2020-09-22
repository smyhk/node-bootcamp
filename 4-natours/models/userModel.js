const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have name'],
    trim: true,
    maxlength: [40, 'A user name must have less than 41 characters'],
    minlength: [3, 'A user name must have at least 10 characters'],
    // validate: [validator.isAlpha, 'Tour name must only contain letters'],
  },
  email: {
    type: String,
    required: [true, 'A user must have name'],
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: [40, 'An email must have less than 41 characters'],
    // minlength: [10, 'An email must have at least 10 characters'],
    validate: [validator.isEmail, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    //trim: true,
    //maxlength: [40, 'A password must have less than 41 characters'],
    //minlength: [8, 'A password must have at least 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match',
    },
    //trim: true,
    //maxlength: [40, 'A password must have less than 41 characters'],
    //minlength: [8, 'A password must have at least 8 characters'],
  },
  photo: {
    type: String,
  },
});

userSchema.pre('save', async function (next) {
  // Runs only when password mofified
  if (!this.isModified('password')) return next();

  // Hash passwoes with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
