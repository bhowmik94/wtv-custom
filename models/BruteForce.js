const mongoose = require('mongoose');
const BruteForceSchema = require("express-brute-mongoose/dist/schema");

const BruteForce = mongoose.model (
  'bruteforce',
  new mongoose.Schema(BruteForceSchema)
);


module.exports = BruteForce;
