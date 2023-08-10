/** @format */
const { text } = require('express');
const db = require('../config/db');

// To create a new post
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await db.query(
      'INSERT INTO blog (title, content) VALUES ($1, $2)',
      [title, content]
    );
    return res.status(201).json({
      message: 'post successfully created',
      post: newPost,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// To show all created post
const getPost = async (req, res) => {
  try {
    const newPost = await db.query('SELECT * FROM blog ORDER BY id ASC');

    return res.status(200).json({
      message: '    All post view successfully',
      post: newPost.rows,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPost,
};
