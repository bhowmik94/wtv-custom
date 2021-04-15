const User = require('../models/User');
const Setting=require('../models//Setting')
const readFile = require('fs').readFile;
var bcrypt = require('bcrypt');
var csvjson = require('csvjson');
const signupSuccess = require('../mail/signupSuccessTemplate.js');

let index = (req, res) => {

    res.render('admin/index', { title: 'Admin' });

};

let uploadUsers = (req, res) => {

    res.render('admin/bulk_user_upload', { title: 'Upload Bulk Users', msg: '', csrfToken: req.csrfToken() });

};

let users = async (req, res) => {

    const foundUsers = await User.find({})

    res.render('admin/users', { title: 'Admin Users ', users: foundUsers });

};

let changeLogo = async (req, res) => {



      res.render('admin/logo', {  title: 'Upload Logo', msg: '', csrfToken: req.csrfToken()  });


};

let uploadLogo = async (req, res) => {

    var query = {},
    update = { logo: req.file.filename },
    options = { upsert: true, new: true, setDefaultsOnInsert: true }
    const changedLogo = await Setting.update(query, update, options,)
    console.log(changedLogo)
      res.render('admin/logo', { title: 'Upload Bulk Users', msg: 'Upload Done ', csrfToken: '' });


};


let uploadBulkUser= async (req, res, next) => {
  readFile('./uploads/' + req.file.filename, 'utf-8', async (err, fileContent) => {
    if (err) {
      console.log(err); // Do something to handle the error or just throw it
      throw new Error(err);
    }
    const jsonObj = csvjson.toObject(fileContent);
    for (let d of jsonObj) {
      const user1 = await User.find({ email: d.email }).lean()
      if (!user1.length) {
        const salt = 10
        const hash1 = await bcrypt.hash(d.password, salt)
        const passwordClear = d.password
        d.password = hash1
        console.log(d.email)
        const user2 = await User.create(d)
        const signUpResponse = await signupSuccess(user2, passwordClear, req.params.language);
      }
    }
    console.log('Upload Completed')
  });
  res.render('admin/bulk_user_upload', { title: 'Upload Bulk Users', msg: 'Upload Done ', csrfToken: '' });
}




module.exports = {
  index: index,
  users: users,
  uploadUsers: uploadUsers,
  uploadBulkUser:uploadBulkUser,
  changeLogo:changeLogo,
  uploadLogo:uploadLogo
}
