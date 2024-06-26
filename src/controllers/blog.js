/** @format */
const db = require('../config/db');

// To create a new post
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    await db.query(
      'INSERT INTO blog (title, content) VALUES ($1, $2)',
      [title, content],
      res.status(201).json({
        message: 'Post created successfully',
      })
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// To show all created post
const viewPost = async (req, res) => {
  try {
    const { rows: posts } = await db.query('SELECT * FROM blog');

    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts found' });
    }

    return res.status(200).json({
      message: 'Posts retrieved successfully',
      posts,
    });
  } catch (error) {
    console.error('Error retrieving posts:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// To update a created post by id
const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;

    await db.query(
      `UPDATE blog SET title = $1, content = $2 WHERE id = $3`[
        (title, content, id)
      ],
      res.status(200).json({
        message: 'Post updated successfully',
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// To delete a created post by id
const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await db.query(
      'DELETE FROM blog WHERE id = $1',
      [id],
      res.status(200).json({
        message: 'Post deleted successfully',
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  viewPost,
  updatePost,
  deletePost,
};
