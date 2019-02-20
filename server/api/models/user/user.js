const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: 'avatar.png',
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
userSchema.set('toJSON', {
  versionKey: false,
  transform(_, ret) {
    delete ret._id;
    delete ret.password;
  },
});

module.exports = mongoose.model('user', userSchema);
