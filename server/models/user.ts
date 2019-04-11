import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User extends Document {
  _id: Schema.Types.ObjectId;
  role: string[];
  email: string;
  username: string;
  password: string;
  avatar: string;
  social_id: string;
  created_at: Date;
  updated_at: Date;

  hash: (password: string) => string;
  compare: (password: string) => boolean;
}

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
userSchema.methods.hash = (password: string): string => {
  const salt = bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT_ROUND));
  return bcrypt.hashSync(password, salt);
};

/**
 * Compare passwords
 * @param {String} password
 * @returns {Boolean} true: Matched, false: Mismatched
 */
userSchema.methods.compare = function(password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

// Transform document to JSON
userSchema.set('toJSON', {
  versionKey: false,
  transform(_, ret): void {
    ret.id = ret._id;
    delete ret._id;
  },
});

// Transform document to object
userSchema.set('toObject', {
  versionKey: false,
  transform(_, ret): void {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    delete ret.social_id;
  },
});

export default mongoose.model<User>('User', userSchema);
