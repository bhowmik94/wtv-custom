const mongoose = require('mongoose');

const cachedApiDataSchema = new mongoose.Schema({
  key: { type: String, unique: true, index: true },
  value: mongoose.Schema.Types.Mixed,
  cacheExpiry: Date,
}, { timestamps: true });


const CachedApiData = mongoose.model('CachedApiData', cachedApiDataSchema);

module.exports = CachedApiData;
