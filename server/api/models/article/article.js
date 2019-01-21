const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  stars: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})

module.exports = mongoose.model('article', articleSchema)
