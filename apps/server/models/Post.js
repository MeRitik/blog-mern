import mongoose from 'mongoose';
import PostContent from './PostContent';

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
      unique: true
    },

    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 300
    },

    content: {
      type: [PostContent.schema],
      required: true
    },

    tags: [
      {
        type: String,
        trim: true,
        lowercase: true
      }
    ],

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

PostSchema.index({
  title: 'text',
  description: 'text'
});

export default mongoose.model('Post', PostSchema);
