const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  logo: {
    type: String
  },

});

const Setting = mongoose.model('Setting', userSchema);

module.exports = Setting;
