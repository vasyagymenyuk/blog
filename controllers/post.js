const { Post } = require('../database/models/index');

exports.index = async (req, res) => {
  const posts = await Post.findAll();

  if (!posts) return res.status(404).json();

  return res.status(201).json(posts);
};
exports.show = async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id } });

  if (!post) return res.status(404).json();

  return res.status(201).json(post);
};
