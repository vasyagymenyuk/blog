const { Post, PostTheme, PostTags } = require('../database/models/index');

exports.create = async (req, res) => {
  const errors = await req.validation({
    title: 'required|string',
    content: 'required|string',
  });
  if (errors) return res.status(400).json(errors);

  await Post.create({
    userId: req.me.id,
    title: req.body.title,
    content: req.body.content,
  });

  return res.status(201).json({ succes: true });
};
exports.delete = async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id } });
  if (!post) return res.status(404).json();

  const destroy = req.body.destroy && post.deleted;
  if (destroy) await post.destroy();
  else await post.update({ deleted: !post.deleted });

  return res.json(destroy ? null : post.deleted ? true : false);
};

exports.index = async (req, res) => {
  const posts = await Post.findAll({ where: { deleted: false } });

  if (!posts) return res.status(404).json();

  return res.status(201).json(posts);
};
exports.show = async (req, res) => {
  const post = await Post.findOne({
    where: { id: req.params.id, deleted: false },
  });

  if (!post) return res.status(404).json();

  return res.status(201).json(post);
};
