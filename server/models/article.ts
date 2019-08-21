import mongoose, { Document, Schema, Types } from 'mongoose';

/**
 * Article document declaration
 * @interface Article
 * @extends Document
 */
export interface Article extends Document {
  id: Types.ObjectId;
  title: string;
  content: string;
  image: string;
  tags: string[];
  views: number;
  created_at: Date;
  updated_at: Date;
}

/** Article schema declaration */
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
    image: {
      type: String,
      default: '/sites/upload/cover-2.jpg',
    },
    tags: {
      type: Array,
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: false,
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
