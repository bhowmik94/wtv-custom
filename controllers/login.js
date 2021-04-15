const User = require('../models/User');
const passport = require('passport');
const { getUser } = require('../services/streamstudioAPI');
const defaultText = require('../config/languagesText');
var bcrypt = require('bcrypt');
exports.login = async (req, res) => {


  if (req.params.language === 'english' || req.params.language === undefined) {

    res.render('login', {
      title: 'Login',
      msg: '',
      csrfToken: req.csrfToken(),
      pageText: defaultText.english.loginPage,
      language: defaultText.english.language,
    });
  } else {
    console.log(req.params.language);
    res.render('login', {
      title: 'Login',
      msg: '',
      csrfToken: req.csrfToken(),
      pageText: defaultText[req.params.language].loginPage,
      language: defaultText[req.params.language].language,
    });
  }
};

exports.loginPost = async (req, res, next) => {
  const webcastID = process.env.STREAMSTUDIOWEBCASTID;
  const user1 = await User.find({ email: req.body.email })
    .lean();

  if (!user1.length) {
    res.render('login', {
      title: 'Login',
      csrfToken: req.csrfToken(),
      msg: defaultText[req.params.language].loginPage.userNotExistingLoginMessage,
      pageText: defaultText[req.params.language].loginPage,
      language: defaultText[req.params.language].language,
    });
  } else {
    const comparePassword = await bcrypt.compare(req.body.password, user1[0].password);
    if (!comparePassword) {
      res.render('login', {
        title: 'Login',
        csrfToken: req.csrfToken(),
        msg: defaultText[req.params.language].loginPage.wrongLoginMessage,
        pageText: defaultText[req.params.language].loginPage,
        language: defaultText[req.params.language].language,
      });
    } else {
      try {
        const webcastUserId = await getUser(req.body);
        console.log(webcastUserId.body.user.viewerId)
        req.logIn(user1[0], async (err) => {
          const user1 = await User.update({ email: req.body.email }, { $set: { accessAt: new Date() } });
            if(webcastUserId.body.code === "200"){
              console.log('id gotten')
              res.cookie(`wtv_v_${webcastID}`, `${webcastUserId.body.user.viewerId}`,{domain:"world-television.com",httpOnly: false}).redirect('/')
            }
            else{
              res.redirect('/')
            }
        });

      } catch (e) {
        res.redirect('/')
      }
    }
  }
};
