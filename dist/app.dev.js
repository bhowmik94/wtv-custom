"use strict";

/**
 * Module dependencies.
 */
var express = require('express');

var enforce = require('express-sslify');

var connect = require('connect');

var csrf = require('csurf');

var compression = require('compression');

var session = require('express-session');

var bodyParser = require('body-parser');

var logger = require('morgan');

var chalk = require('chalk');

var errorHandler = require('errorhandler');

var dotenv = require('dotenv');

var MongoStore = require('connect-mongo')(session);

var flash = require('express-flash');

var fs = require('fs');

var multer = require('multer');

var path = require('path');

var mongoose = require('mongoose');

var ExpressBrute = require("express-brute");

var MongooseStore = require("express-brute-mongoose");

var BruteForceSchema = require("express-brute-mongoose/dist/schema");

var expressStatusMonitor = require('express-status-monitor');

var sass = require('node-sass-middleware');

var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

var secure = require('./middlewares/secure');

var bcrypt = require('bcrypt');

var csvjson = require('csvjson');

var cookieParser = require('cookie-parser');

var RECAPTCHA_SECRET = '6LdYb_8UAAAAAK_Qa7UynORVt_I5xQwY7UkgKkys';

var Request = require("request");

var rateLimit = require('express-rate-limit');

var helmet = require('helmet'); //const RECAPTCHA_SITE_KEY_V3 = '6Lc7FP8UAAAAAAsTcm3h335mi02nnPFqQ52jt3VN'
//const RECAPTCHA_SECRET_KEY_V3 = '6Lc7FP8UAAAAAKgNSmsJiTBkkYb6AScVf49O1HMR'


var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
var upload = multer({
  storage: storage
});
var rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  // 24 hrs in milliseconds
  max: 20,
  message: "\n   <div style=\"display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;margin-top:-50\">\n   <h4 style=\"color:#grey\">You have exceeded the  requests  allowed in 5 Minute limit!.</h2>\n   <h2 style=\"color:#grey\">please try after 5 min</h4>\n </div>\n   ",
  headers: true
});
/**
 *
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
//if (process.env['NODE_ENV'] !== 'production') {

dotenv.config({
  path: '.env'
}); //}

/**
 * Controllers (route handlers).
 */

var homeController = require('./controllers/home');

var channelController = require('./controllers/channel');

var playlistController = require('./controllers/playlist');

var apiController = require('./controllers/api');

var contactController = require('./controllers/help');

var agendaController = require('./controllers/agenda');

var resourcesController = require('./controllers/resources');

var loginController = require('./controllers/login');

var registerController = require('./controllers/register');

var liveController = require('./controllers/live');

var liveController2 = require('./controllers/live2');

var indexController = require('./controllers/index');

var AdminController = require('./controllers/admin');

var managerController = require('./controllers/manager');

var MailController = require('./controllers/mail');

var eventsController = require('./controllers/events');

var speakersController = require('./controllers/speakers');

var speakerController = require('./controllers/speaker');

var eventbriteController = require('./controllers/eventbrite');
/**
 * Create Express server.
 */


var app = express();
/**
 * Security Implementation
 */

/**
 * DDOS
 */

var limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs

});
/**
 * BruteForce
 */

var model = mongoose.model("bruteforce", new mongoose.Schema(BruteForceSchema));
var store = new MongooseStore(model); // const bruteforce = new ExpressBrute(store);

/**
 * POST Limiter
 */

var jsonParser = bodyParser.json();
app.set('trust proxy', 1);
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); // app.use(enforce.HTTPS({ trustProtoHeader: true }));
// app.use(rateLimiter);
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// });
// let upload = multer({ storage: storage });

/**
 * Configure Express-Session
 * */

var expressSession = {
  secret: "c9ExiOQ4O9",
  //process.env.SESSION_SECRET,
  cookie: {
    expires: 10800000,
    httpOnly: false
  },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: 'mongodb+srv://psci:jdWJ1wNKD3N2t7dM@cluster0.xbiwc.mongodb.net/kingsbridge?retryWrites=true&w=majority'
  }) //process.env.MONGODB_URI })

};
app.use(cookieParser()); // if (app.get('env') === 'production') {furu
//   expressSession.cookie.secure = true;

/**
 * Connect to MongoDB.
 */

mongoose.set('useFindAndModify', false); //mongoose.set('useCreateIndex', true);
//mongoose.set('useNewUrlParser', true);

mongoose.set('useUnifiedTopology', true);

try {
  mongoose.connect('mongodb+srv://psci:jdWJ1wNKD3N2t7dM@cluster0.xbiwc.mongodb.net/kingsbridge?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function () {
    return console.log("connected");
  });
} catch (error) {
  console.log("could not connect");
}
/**
 * Express configuration.
 */


app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(expressStatusMonitor());
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
app.use(logger('dev'));
app.use(session(expressSession));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); //var csrfProtection = csrf({ cookie: true })

var api = createApiRouter();
app.use(csrf());
app.use(helmet());
/** Passport COnfiguration */

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

var User = require('./models/User');

var Setting = require('./models/Setting'); // passport.use(new LocalStrategy({
//   usernameField: 'email',
//   passReqToCallback: true
// },
//   async (req, email, password, done) => {
//     const response = await User.findByCredentials(req, email, password);
//     if (response.statusCode === 200) {
//       done(null, response);
//     } else {
//       done(response, false);
//     }
//   }));


app.disable('x-powered-by');
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use('/', express["static"](path.join(__dirname, 'public'), {
  maxAge: 31557600000
}));
app.use('/static', express["static"](path.join(__dirname, 'uploads'), {
  maxAge: 31557600000
}));
app.use('/js/lib', express["static"](path.join(__dirname, 'node_modules/chart.js/dist'), {
  maxAge: 31557600000
}));
app.use('/js/lib', express["static"](path.join(__dirname, 'node_modules/popper.js/dist/umd'), {
  maxAge: 31557600000
}));
app.use('/js/lib', express["static"](path.join(__dirname, 'node_modules/bootstrap/dist/js'), {
  maxAge: 31557600000
}));
app.use('/js/lib', express["static"](path.join(__dirname, 'node_modules/jquery/dist'), {
  maxAge: 31557600000
}));
app.use('/js/lib', express["static"](path.join(__dirname, 'node_modules/lodash'), {
  maxAge: 31557600000
}));
app.use('/js/lib', express["static"](path.join(__dirname, 'node_modules/moment/min'), {
  maxAge: 31557600000
}));
app.use('/js/lib', express["static"](path.join(__dirname, 'node_modules/mobile-detect'), {
  maxAge: 31557600000
}));
app.use('/webfonts', express["static"](path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts'), {
  maxAge: 31557600000
}));
app.use('/pug-bootstrap', express["static"](path.join(__dirname, 'node_modules/pug-bootstrap/'), {
  maxAge: 31557600000
}));
/**
 * Primary app routes.
 */

app.get('/', indexController.index);
app.get('/manager', secure(), managerController.manager);
app.get('/manager/search_user', secure(), managerController.searchUser);
app.post('/manager/user_delete/:userId', secure(), managerController.userDelete);
app.get('/home/:language', homeController.home);
app.get('/home/', homeController.home);
app.get('/ondemand', channelController.ondemand); // command use to get channel page as home page

app.get('/ondemand/:language', secure(), channelController.ondemand); // command use to get channel page as home page

app.get('/agenda/:language', secure(), agendaController.agenda);
app.get('/agenda/', secure(), agendaController.agenda);
app.post('/agenda/update', secure(), agendaController.agendaUpdatePost);
app.post('/agenda/add', secure(), agendaController.agendaCreate);
app.get('/resources/:language', secure(), resourcesController.resources);
app.post('/resources/', resourcesController.resourceUpdatePost);
app.post('/resources/update_user', resourcesController.resourcesUpdateDownload);
app.get('/resources/', secure(), resourcesController.resources);
app.get('/events/', secure(), eventsController.events);
app.get('/help', secure(), contactController.contact);
app.get('/help/:language', secure(), contactController.contact);
app.get('/live/:language', liveController.live);
app.get('/live/', liveController.live);
app.get('/live2/', secure(), liveController2.live2);
app.get('/channel/:id', channelController.index);
app.get('/playlist/:channelId/:playlistId/:videoId/:language', playlistController.indexVideo);
app.get('/playlist/:channelId/:playlistId/:language', playlistController.indexPlaylist);
app.get('/upcoming/:channelId/:videoId', playlistController.indexVideoUpcoming);
app.get('/upcoming/:channelId/:playlistId/live', playlistController.indexLiveVideo);
app.get('/login', loginController.login);
app.get('/login/:language', loginController.login);
app.post('/login', urlencodedParser, loginController.loginPost);
app.post('/login/:language', urlencodedParser, loginController.loginPost);
app.get('/resendEmail', MailController.index);
app.post('/resendEmail', MailController.sendMail);
app.get('/register', registerController.register);
app.get('/register/:language', registerController.register);
app.post('/register', registerController.registerUser);
app.post('/register/:language', registerController.registerUser);
app.get('/eventbrite', eventbriteController.eventbrite);
app.get('/eventbrite/:language', eventbriteController.eventbrite);
app.get('/reset-password', registerController.resetPwd);
app.get('/reset-password/:language', registerController.resetPwd);
app.post('/reset-password', registerController.resetPwdPost);
app.post('/reset-password/:language', registerController.resetPwdPost);
app.get('/speakers/:language', speakersController.presenters);
app.get('/speakers/', speakersController.presenters);
app.get('/speaker/:speaker', speakerController.speaker);
app.get('/speaker/:language/:speaker', speakerController.speaker);
app.get('/admin', secure(), AdminController.index);
app.get('/admin/bulk_upload', secure(), AdminController.uploadUsers);
app.get('/admin/users', secure(), AdminController.users);
app.get('/admin/changeLogo', secure(), AdminController.changeLogo);
app.post('/uploads', upload.single("file"
/* name attribute of <file> element in your form */
), function (req, res) {
  return res.status(200).send({
    url: "".concat(process.env.BASE_URL, "/static/").concat(req.file.filename)
  });
});
app.post('/selectRegPath', function (req, res) {
  res.render('register', {
    csrfToken: req.csrfToken()
  });
});
app.get('/success', function (req, res) {
  res.render('success');
});
app.post('/signup', function _callee(req, res, next) {
  var user1, salt, hash1, user2;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.find({
            email: req.body.email
          }).lean());

        case 2:
          user1 = _context.sent;

          if (user1.length) {
            _context.next = 14;
            break;
          }

          salt = 10;
          _context.next = 7;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, salt));

        case 7:
          hash1 = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(User.create({
            email: req.body.email,
            password: hash1,
            username: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
          }));

        case 10:
          user2 = _context.sent;
          res.send('done');
          _context.next = 15;
          break;

        case 14:
          res.send('User already registerd');

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
}); //  });
//  const token = tokenForUser(user1[0])
//  return { user: user1[0], token }
// res.redirect('/'

function createApiRouter() {
  app.post('/admin/changeLogo', urlencodedParser, upload.single('logo'), secure(), AdminController.uploadLogo);
  app.post('/admin/bulk_upload', urlencodedParser, upload.single('avatar'), AdminController.uploadBulkUser);
}
/**
 * API examples routes.
 */


app.get('/api/channel/:channelId/playlist/featured', apiController.getPlaylistFeatured);
app.get('/api/channel/:channelId/videolist/most-watched', apiController.getVideoListMostWatched);
app.get('/api/channel/:channelId/videolist/recent-events', apiController.getVideoListRecentEvents);
app.get('/api/channel/:channelId/videos/featured', apiController.getVideoListChannelFeatured);
app.get('/api/channel/:channelId/playlist/:playlistId/videos', apiController.getPlaylistVideos);
app.get('/api/channel/:channelId/playlist/:playlistId', apiController.getPlaylistDetails);
app.use(function (req, res, next) {
  res.render('404');
});
/**
 * Start Express server.
 */

app.listen(app.get('port'), function () {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});
module.exports = app;