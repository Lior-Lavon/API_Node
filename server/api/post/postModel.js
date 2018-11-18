const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'author',
    required: true,
  },
  categories: [
    { type: Schema.Types.ObjectId, ref: 'category' },
  ],
});

module.exports = mongoose.model('post', postSchema);
