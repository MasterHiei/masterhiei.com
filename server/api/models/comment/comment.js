const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    subject: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true,
      },
    ],
    createdBy: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

module.exports = mongoose.model('comment', commentSchema);
