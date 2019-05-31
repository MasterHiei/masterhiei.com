import mongoose, { Schema, Document } from 'mongoose';

// Document type declaration
export interface Article extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  content: string;
  image: string;
  tags: string[];
  stars: number;
  views: number;
  created_at: Date;
  updated_at: Date;
}

// Input type declaration
export interface ArticleInput {
  title: Article['title'];
  content: Article['content'];
  image: Article['image'];
  tags: Article['tags'];
}

// Schema type declaration
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
      type: [String],
      default: [],
    },
    stars: {
      type: Number,
      default: 0,
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
