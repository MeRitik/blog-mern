import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 150
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 300
    },
    content: {
      type: String,
      required: true,
      minlength: 20
    },
    tags: {
      type: [String],
      lowercase: true,
      trim: true,
      index: true
    },
    readTime: {
      type: Number,
      required: true,
      min: 1
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    imageUrl: {
      type: String,
      match: [/^https?:\/\//, 'Invalid image URL']
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft'
    },
    views: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

PostSchema.index({ title: 'text', description: 'text', content: 'text' });

export default mongoose.model('Post', PostSchema);