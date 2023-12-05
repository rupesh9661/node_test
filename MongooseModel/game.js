const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  user_id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
});

const game = mongoose.model('game', gameSchema);

module.exports = game;