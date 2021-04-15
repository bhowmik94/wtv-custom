const mongoose = require('mongoose');

const loginPage = new mongoose.Schema({
  chooseYourLanguageText: {
    type: String
  },

  header: {
    type: String
  },

  emailPlaceHolder: {
    type: String
  },

  passwordPlaceHolder: {
    type: String
  },

  submitButtonText: {
    type: String
  },

  secondHeaderText: {
    type: String
  },

  anchor: {
    type: String
  }
});


const registerPage = new mongoose.Schema({

  chooseYourLanguageText: {
    type: String
  },

  header: {
    type: String
  },

  titlePlaceHolder: {
    type: String,
  },
  firstNamePlaceHolder: {
    type: String,
  },
  lastNamePlaceHolder: {
    type: String,
  },
  middleNamePlaceHolder: {
    type: String,
  },
  organizationPlaceHolder: {
    type: String,
  },
  rolePlaceHolder: {
    type: String,
  },
  countryPlaceHolder: {
    type: String,
  },

  emailPlaceHolder: {
    type: String
  },
  submitButtonText: {
    type: String
  },

  secondHeaderText: {
    type: String
  },

  anchor: {
    type: String
  }
});


const homePage = new mongoose.Schema({

  titleHeader: {
    type: String
  },
  dateHeader:{
    type:String
  },
  timeHEader:{
    type:String
  },

  bodyHeader:{
    type:String
  },

  bodySecondHeader:{
    type:String
  },
  bodyText:{
    type:String
  },


});


const languageSchema = new mongoose.Schema({

  language: {
    type:String
  },

  loginPage:{
    type:loginPage
  },

  registerPage:{
    type:registerPage
  },

  homePage:{
    type:loginPage
  }

});


const Language = mongoose.model('Language', languageSchema);

module.exports = Language;
