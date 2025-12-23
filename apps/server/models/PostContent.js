import mongoose from "mongoose";

const PostContent = new mongoose.Schema(
  {
    contentType: {
      type: String,
      enum: [
        'heading',
        'subheading',
        'paragraph',
        'image',
        'code',
        'quote',
        'list'
      ],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);

export default mongoose.model("ContentBlock", ContentBlock);