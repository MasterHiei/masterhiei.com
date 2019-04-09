import mongoose, { Schema, Document } from 'mongoose';

export interface Article extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  content: string;
  category: string;
  tags: string[];
  stars: number;
  comments: Schema.Types.ObjectId[];
  views: number;
  modified_at: Date;
  created_at: Date;
  updated_at: Date;
}

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
      default: undefined,
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
articleSchema.set('toJSON', {
  versionKey: false,
  transform(_, ret): void {
    ret.id = ret._id;
    delete ret._id;
  },
});

export default mongoose.model<Article>('Article', articleSchema);
