const fs = require('fs');

const {
  Post,
  PostTheme,
  PostTag,
  PostImages,
} = require('../database/models/index');
//  CREATE
exports.create = async (req, res) => {
  const errors = await req.validation({
    title: 'required|string',
    body: 'required|string',
    themes: 'ifExists|required|array',
    tags: 'ifExists|required|array',
  });

  if (errors) return res.json(errors);

  const data = req.only('title', 'body');

  data.userId = req.me.id;

  const post = await Post.create(data);

  await post.addTags(req.body.tags);
  await post.addThemes(req.body.themes);

  return res.status(201).json({ success: true });
};

// ADD-IMAGES
exports.addImages = async (req, res) => {
  const post = await Post.findOne({
    where: { id: req.params.id, userId: req.me.id },
  });

  const images = req.files;

  const { STORAGE_PATH, STORAGE_POST_IMAGES_PATH } = process.env;

  if (!post) {
    images.forEach((file) => {
      try {
        fs.unlinkSync(
          __dirname +
            '/../' +
            STORAGE_PATH +
            STORAGE_POST_IMAGES_PATH +
            file.filename
        );
      } catch (e) {
        console.log(e);
      }
    });

    return res.status(400).json({ success: false });
  } else {
    await PostImages.bulkCreate(
      images.map((image) => ({
        postId: post.id,
        src: STORAGE_PATH + STORAGE_POST_IMAGES_PATH + image.filename,
      }))
    );

    return res.json({ success: true });
  }
};

// INDEX
exports.index = async (req, res) => {
  const posts = await Post.findAll({
    where: { deleted: false },
    include: [
      { model: PostTag, as: 'postTags', include: ['tags'] },
      { model: PostTheme, as: 'postThemes', include: ['themes'] },
    ],
  });

  return res.json(posts);
};

// SHOW
exports.show = async (req, res) => {
  const post = await Post.findOne({
    where: { id: req.params.id, deleted: false },
    include: ['tags', 'themes'],
  });

  if (!post) return res.status(404).json();

  return res.json(post);
};

// DELETE
exports.delete = async (req, res) => {
  const post = await Post.findOne({
    where: { id: req.params.id, userId: req.me.id },
  });

  if (!post) return res.status(404).json();

  const destroy = req.body.destroy && post.deleted;

  if (destroy) {
    await post.destroy();
  } else {
    await post.update({ deleted: !post.deleted });
  }

  return res.json(destroy ? null : post.deleted ? true : false);
};
