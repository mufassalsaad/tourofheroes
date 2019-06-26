const mongodb = require('mongodb');
const Schema = mongodb.Schema;

// Define collection and schema for Business
let Hero = new Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
},{
    collection: 'heroes'
});

module.exports = mongoose.model('Hero', Hero);