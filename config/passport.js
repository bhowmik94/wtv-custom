 const passport = require('passport');
const refresh = require('passport-oauth2-refresh');
const axios = require('axios');
const Auth0Strategy = require("passport-auth0");
const dotenv = require('dotenv')
const { Strategy: InstagramStrategy } = require('passport-instagram');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const { Strategy: SnapchatStrategy } = require('passport-snapchat');
const { Strategy: TwitterStrategy } = require('passport-twitter');
const { Strategy: GitHubStrategy } = require('passport-github');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');
const { Strategy: LinkedInStrategy } = require('passport-linkedin-oauth2');
const { Strategy: OpenIDStrategy } = require('passport-openid');
const { OAuthStrategy } = require('passport-oauth');
const { OAuth2Strategy } = require('passport-oauth');
const _ = require('lodash');
const moment = require('moment');

const User = require('../models/User');

 if (process.env.NODE_ENV != 'production') {
   dotenv.config({ path: '.env.example' });
 }


