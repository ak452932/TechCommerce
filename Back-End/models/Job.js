const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  link: { type: String, unique: true },
  pubDate: Date,
  summary: String,
  company: String,
  location: String,
  industry: String,
  type: String,
  description: String
},{ timestamps: true });

module.exports = mongoose.model('Job', jobSchema);