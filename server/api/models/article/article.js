const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    stars: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    modified_at: {
      type: Date,
      default: Date.now,
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
articleSchema.set('toJSON', {
  versionKey: false,
  transform(_, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model('article', articleSchema);
