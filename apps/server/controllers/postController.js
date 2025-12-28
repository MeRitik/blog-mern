import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  try {
    const { title, description, content, tags, readTime, status } = req.body;

    // Validate required fields
    if (!title || !description || !content || !readTime) {
      return res.status(400).json({
        message: 'Missing required fields: title, description, content, and readTime are required'
      });
    }

    // Validate content array
    if (!Array.isArray(content) || content.length === 0) {
      return res.status(400).json({
        message: 'Content must be a non-empty array'
      });
    }

    // Validate content blocks structure
    for (const block of content) {
      if (!block.contentType || !block.content || block.order === undefined) {
        return res.status(400).json({
          message: 'Each content block must have contentType, content, and order'
        });
      }
      
      const validTypes = ['heading', 'subheading', 'paragraph', 'image', 'code', 'quote', 'list'];
      if (!validTypes.includes(block.contentType)) {
        return res.status(400).json({
          message: `Invalid contentType: ${block.contentType}. Must be one of: ${validTypes.join(', ')}`
        });
      }
    }

    // Generate slug from title if not provided
    const slug = req.body.slug || title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Get author from authenticated user
    const author = req.user.id;

    // Create new post
    const newPost = new Post({
      title,
      slug,
      description,
      content,
      tags: tags || [],
      readTime,
      author,
      status: status || 'draft'
    });

    // Save to database
    const savedPost = await newPost.save();

    // Populate author details
    await savedPost.populate('author', 'name email');

    res.status(201).json({
      message: 'Post created successfully',
      post: savedPost
    });

  } catch (error) {
    // Handle duplicate slug error
    if (error.code === 11000 && error.keyPattern?.slug) {
      return res.status(409).json({
        message: 'A post with this slug already exists. Please modify the title.'
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation error',
        errors: messages
      });
    }

    console.error('Error creating post:', error);
    res.status(500).json({
      message: 'Failed to create post',
      error: error.message
    });
  }
};
