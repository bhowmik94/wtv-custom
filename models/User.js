const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');



const userSchema = new mongoose.Schema({
  title:{
    type:String
  },
  firstName: {
    type: String
  },
  middleName:{
    type:String
  },
  password: {
    type: String
  },
  lastName: {
    type: String
  },
  title: {
    type: String
  },
  email: {
    unique: true,
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('The email format is invalid, should be your email address');
      }
    }
  },
  location: {
    type: String
  },
  company: {
    type: String
  },
  role: {
    type: String,
    default:'user'
  },
  dob: { // Date of Birth
    type: Date
  },
  address: {
    type: String
  },
  question:{
    type:String
  },
  requirements: {
    type: String
  },
  // img:
  // {
  //     data: Buffer,
  //     contentType: String
  // },

  registeredAt: {
    type: Date,
    default: Date.now
  },
  accessAt:{
    type:Date,
    default: Date.now
  },
  dowloadedResources:{
    type:[String],
  }

});

/**
 * Password hash middleware.
 */


/**
 * Helper method for validating user's password.
 */


userSchema.statics.findByCredentials = async (req, email, password) => {
  console.log(req.body)
  if (password === 'WTVGLOBAL2020') {
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {

      user.accessAt = Date.now();
      user.save();
      return {
        statusCode: 200,
        message: 'Authorized'
      }
    } else {
      return {
        statusCode: 500,
        message: 'your username or password is not recognized'
      }
    }
  }
  else {
    return {
      statusCode: 500,
      message: 'your username or password is not recognized'
    }
  }

};

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);

module.exports = User;
