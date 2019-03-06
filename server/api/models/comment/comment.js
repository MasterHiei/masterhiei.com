const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: 'Article',
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

// Transform the returned object
commentSchema.set('toJSON', {
  versionKey: false,
  transform(_, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model('comment', commentSchema);
