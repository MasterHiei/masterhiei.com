import mongoose, { Schema, Document } from 'mongoose';

export interface Comment extends Document {
  _id: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  article: Schema.Types.ObjectId;
  content: string;
  created_at: Date;
  updated_at: Date;
}

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

// Transform document to JSON
commentSchema.set('toJSON', {
  versionKey: false,
  transform(_, ret): void {
    ret.id = ret._id;
    delete ret._id;
  },
});

export default mongoose.model<Comment>('Comment', commentSchema);
