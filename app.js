/**
 * Module dependencies.
 */
 const express = require('express');
 const enforce = require('express-sslify');
 var connect = require('connect')
 var csrf = require('csurf')
 const compression = require('compression');
 const session = require('express-session');
 const bodyParser = require('body-parser');
 const logger = require('morgan');
 const chalk = require('chalk');
 const errorHandler = require('errorhandler');
 const dotenv = require('dotenv')
 const MongoStore = require('connect-mongo')(session);
 const flash = require('express-flash');
 const fs = require('fs');
 const multer = require('multer');
 const path = require('path');
 const mongoose = require('mongoose');
 const ExpressBrute = require("express-brute");
 const MongooseStore = require("express-brute-mongoose");
 const BruteForceSchema = require("express-brute-mongoose/dist/schema");
 const expressStatusMonitor = require('express-status-monitor');
 const sass = require('node-sass-middleware');
 const passport = require('passport');
 const LocalStrategy = require('passport-local').Strategy;
 const secure = require('./middlewares/secure');
 
 var bcrypt = require('bcrypt');
 
 const csvjson = require('csvjson');
 const cookieParser = require('cookie-parser');
 const RECAPTCHA_SECRET = '6LdYb_8UAAAAAK_Qa7UynORVt_I5xQwY7UkgKkys'
 const Request = require("request");
 const rateLimit = require('express-rate-limit');
 const helmet = require('helmet')
 //const RECAPTCHA_SITE_KEY_V3 = '6Lc7FP8UAAAAAAsTcm3h335mi02nnPFqQ52jt3VN'
 //const RECAPTCHA_SECRET_KEY_V3 = '6Lc7FP8UAAAAAKgNSmsJiTBkkYb6AScVf49O1HMR'
 
 
//  const multer = require('multer')
//  var storage = multer.diskStorage({
//    destination: function (req, file, cb) {
//      cb(null, path.join(__dirname, 'uploads'))
//    },
//    filename: function (req, file, cb) {
//      cb(null, Date.now() + '-' + file.originalname)
//    }
//  })
 
//  var upload = multer({ storage: storage })
 
 
 const rateLimiter = rateLimit({
   windowMs: 5 * 60 * 1000, // 24 hrs in milliseconds
   max: 20,
   message: `
   <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;margin-top:-50">
   <h4 style="color:#grey">You have exceeded the  requests  allowed in 5 Minute limit!.</h2>
   <h2 style="color:#grey">please try after 5 min</h4>
 </div>
   `,
   headers: true,
 });
 
 
 
 
 
 /**
  *
  * Load environment variables from .env file, where API keys and passwords are configured.
  */
 //if (process.env['NODE_ENV'] !== 'production') {
 dotenv.config({ path: '.env' });
 //}
 
 
 
 
 /**
  * Controllers (route handlers).
  */
 const homeController = require('./controllers/home');
 const channelController = require('./controllers/channel');
 const playlistController = require('./controllers/playlist');
 const apiController = require('./controllers/api');
 const contactController = require('./controllers/help');
 const agendaController = require('./controllers/agenda');
 const resourcesController = require('./controllers/resources');
 const loginController = require('./controllers/login');
 const registerController = require('./controllers/register');
 const liveController = require('./controllers/live');
 const liveController2 = require('./controllers/live2');
 const indexController = require('./controllers/index');
 const AdminController = require('./controllers/admin');
 const managerController = require('./controllers/manager');
 const MailController = require('./controllers/mail');
 const eventsController = require('./controllers/events');
 const speakersController = require('./controllers/speakers');
 const speakerController = require('./controllers/speaker');
 const eventbriteController = require('./controllers/eventbrite')
 
 
 
 /**
  * Create Express server.
  */
 const app = express();
 
 
 /**
  * Security Implementation
  */
 
 /**
  * DDOS
  */
 
 const limiter = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 100 // limit each IP to 100 requests per windowMs
 });
 
 /**
  * BruteForce
  */
 
 const model = mongoose.model(
   "bruteforce",
   new mongoose.Schema(BruteForceSchema)
 );
 const store = new MongooseStore(model);
 
 // const bruteforce = new ExpressBrute(store);
 
 /**
  * POST Limiter
  */
 
 var jsonParser = bodyParser.json()
 app.set('trust proxy', 1);
 var urlencodedParser = bodyParser.urlencoded({ extended: false })
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 // app.use(enforce.HTTPS({ trustProtoHeader: true }));
 
 // app.use(rateLimiter);
 

 
 const storage = multer.diskStorage({
   destination: (req, file, cb) => {
       cb(null, 'uploads')
   },
   filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
   }
 });

  let upload = multer({ storage: storage });



 /**
  * Configure Express-Session
  * */
 
 const expressSession = {
   secret: "c9ExiOQ4O9", //process.env.SESSION_SECRET,
   cookie: {
     expires: 10800000,
     httpOnly: false,
 
   },
   resave: false,
   saveUninitialized: true,
   store: new MongoStore({ url:'mongodb+srv://psci:jdWJ1wNKD3N2t7dM@cluster0.xbiwc.mongodb.net/kingsbridge?retryWrites=true&w=majority' })
   //process.env.MONGODB_URI })
 };
 
 app.use(cookieParser());
 
 // if (app.get('env') === 'production') {furu
 //   expressSession.cookie.secure = true;
 /**
  * Connect to MongoDB.
  */
 mongoose.set('useFindAndModify', false);
 //mongoose.set('useCreateIndex', true);
 //mongoose.set('useNewUrlParser', true);
 mongoose.set('useUnifiedTopology', true);
 
 try {
   mongoose.connect('mongodb+srv://psci:jdWJ1wNKD3N2t7dM@cluster0.xbiwc.mongodb.net/kingsbridge?retryWrites=true&w=majority' , { useNewUrlParser: true, useUnifiedTopology: true }, () =>
     console.log("connected"));
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
 app.use(flash());
 //var csrfProtection = csrf({ cookie: true })
 var api = createApiRouter()
 app.use(csrf())
 app.use(helmet())
 
 /** Passport COnfiguration */
 passport.serializeUser((user, done) => {
   done(null, user);
 });
 
 passport.deserializeUser((user, done) => {
   done(null, user);
 });
 
 const User = require('./models/User');
 const Setting= require('./models/Setting');
 
 
 // passport.use(new LocalStrategy({
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
 app.use((req, res, next) => {
   res.locals.user = req.user;
   next();
 });
 
 app.use('/', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
 app.use('/static', express.static(path.join(__dirname, 'uploads'), { maxAge: 31557600000 }));
 app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/chart.js/dist'), { maxAge: 31557600000 }));
 app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd'), { maxAge: 31557600000 }));
 app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'), { maxAge: 31557600000 }));
 app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/jquery/dist'), { maxAge: 31557600000 }));
 app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/lodash'), { maxAge: 31557600000 }));
 app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/moment/min'), { maxAge: 31557600000 }));
 app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/mobile-detect'), { maxAge: 31557600000 }));
 app.use('/webfonts', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts'), { maxAge: 31557600000 }));
 app.use('/pug-bootstrap', express.static(path.join(__dirname, 'node_modules/pug-bootstrap/'), { maxAge: 31557600000 }));
 
 
 /**
  * Primary app routes.
  */
 app.get('/', indexController.index);
 app.get('/manager',secure(), managerController.manager);
 app.get('/manager/search_user',secure(), managerController.searchUser);
 app.post('/manager/user_delete/:userId',secure(),managerController.userDelete)
 app.get('/home/:language', homeController.home);
 app.get('/home/',  homeController.home);
 app.get('/ondemand',  channelController.ondemand);  // command use to get channel page as home page
 app.get('/ondemand/:language',secure(), channelController.ondemand);  // command use to get channel page as home page
 app.get('/agenda/:language',secure(),  agendaController.agenda);
 app.get('/agenda/',secure(), agendaController.agenda);
 app.post('/agenda/update',secure(),  agendaController.agendaUpdatePost);
 app.post('/agenda/add',secure(),  agendaController.agendaCreate);
 app.get('/resources/:language',secure(), resourcesController.resources);
 app.post('/resources/', resourcesController.resourceUpdatePost);
 app.post('/resources/update_user', resourcesController.resourcesUpdateDownload);
 app.get('/resources/',secure(), resourcesController.resources);
 app.get('/events/',secure(),  eventsController.events);
 app.get('/help',secure(),  contactController.contact);
 
 app.get('/help/:language',secure(),  contactController.contact);
 app.get('/live/:language', liveController.live);
 app.get('/live/', liveController.live);
 app.get('/live2/',secure(), liveController2.live2);
 app.get('/channel/:id', channelController.index);
 app.get('/playlist/:channelId/:playlistId/:videoId/:language',  playlistController.indexVideo);
 app.get('/playlist/:channelId/:playlistId/:language', playlistController.indexPlaylist);
 app.get('/upcoming/:channelId/:videoId', playlistController.indexVideoUpcoming);
 app.get('/upcoming/:channelId/:playlistId/live',  playlistController.indexLiveVideo);
 app.get('/login', loginController.login);
 app.get('/login/:language', loginController.login);
 app.post('/login', urlencodedParser,loginController.loginPost)
 app.post('/login/:language',urlencodedParser,loginController.loginPost)
 app.get('/resendEmail', MailController.index)
 app.post('/resendEmail', MailController.sendMail)
 app.get('/register', registerController.register)
 app.get('/register/:language', registerController.register)
 app.post('/register', registerController.registerUser)
 app.post('/register/:language', registerController.registerUser)
 app.get('/eventbrite', eventbriteController.eventbrite);
 app.get('/eventbrite/:language', eventbriteController.eventbrite);
 app.get('/reset-password', registerController.resetPwd)
 app.get('/reset-password/:language', registerController.resetPwd)
 app.post('/reset-password', registerController.resetPwdPost)
 app.post('/reset-password/:language', registerController.resetPwdPost)
 app.get('/speakers/:language', speakersController.presenters);
 app.get('/speakers/', speakersController.presenters);
 app.get('/speaker/:speaker', speakerController.speaker);
 app.get('/speaker/:language/:speaker', speakerController.speaker);
 app.get('/admin', secure(), AdminController.index);
 app.get('/admin/bulk_upload', secure(), AdminController.uploadUsers);
 app.get('/admin/users', secure(), AdminController.users);
 app.get('/admin/changeLogo', secure(), AdminController.changeLogo);
 
 
 app.get('/success',(req,res)=>{
   res.render('success')
 })
 
 app.post('/signup', async (req, res, next) => {
   const user1 = await User.find({ email: req.body.email }).lean()
 
   if (!user1.length) {
     const salt = 10
     const hash1 = await bcrypt.hash(req.body.password, salt)
     const user2 = await User.create({ email: req.body.email, password: hash1, username: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName })
     res.send('done')
   }
   else {
     res.send('User already registerd')
   }
 })
 
 
 
   //  });
 
 
 
   //  const token = tokenForUser(user1[0])
   //  return { user: user1[0], token }
   // res.redirect('/'
 
 function createApiRouter() {
   app.post('/admin/changeLogo',  urlencodedParser, upload.single('logo'),secure(), AdminController.uploadLogo);
   app.post('/admin/bulk_upload', urlencodedParser, upload.single('avatar'),AdminController.uploadBulkUser)
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
   res.render('404')
 })
 /**
  * Start Express server.
  */
 app.listen(app.get('port'), () => {
   console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
   console.log('  Press CTRL-C to stop\n');
 });
 
 module.exports = app;
