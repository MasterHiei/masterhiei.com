const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    role: {
      type: [String],
      default: ['user'],
    },
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
      default: `${process.env.DOMAIN}/public/avatar/avatar.png`,
    },
    social_id: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

/**
 * Hash a password
 * @param {String} password
 * @returns {String} Encrypted password string
 */
userSchema.methods.hash = password => {
  const salt = bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT_ROUND));
  return bcrypt.hashSync(password, salt);
};

/**
 * Compare passwords
 * @param {String} password
 * @returns {Boolean} true: Matched, false: Mismatched
 */
userSchema.methods.compare = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// Transform the returned JSON
userSchema.set('toJSON', {
  versionKey: false,
  transform(_, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

// Transform the returned object
userSchema.set('toObject', {
  versionKey: false,
  transform(_, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    delete ret.social_id;
  },
});

module.exports = mongoose.model('User', userSchema);
