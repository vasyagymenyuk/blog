const fs = require("fs");

const {
  Post,
  PostTheme,
  PostTag,
  PostImages,
} = require("../database/models/index");

//  CREATE
exports.create = async (req, res) => {
  const errors = await req.validation({
    title: "required|string",
    body: "required|string",
    themes: "ifExists|required|array",
    tags: "ifExists|required|array",
  });

  if (errors) return res.json(errors);

  const data = req.only("title", "body");

  data.userId = req.me.id;

  const post = await Post.create(data);

  await post.addTags(req.body.tags);
  await post.addThemes(req.body.themes);

  // при создании поста теги и темы должны добавляться в user_tag И user_theme, повторяющие добавляться не должны.

  return res.status(201).json({ success: true });
};

// ADD-IMAGES
exports.addImages = async (req, res) => {
  const post = await Post.findOne({
    where: { id: req.params.id, userId: req.me.id, deleted: 0 },
  });

  const images = req.files;

  const { STORAGE_PATH, STORAGE_POST_IMAGES_PATH } = process.env;

  if (!post) {
    images.forEach((file) => {
      try {
        fs.unlinkSync(
          __dirname +
            "/../" +
            STORAGE_PATH +
            STORAGE_POST_IMAGES_PATH +
            file.filename
        );
      } catch (e) {
        console.log(e);
      }
    });

    return res.status(403).json({ success: false });
  } else
    await PostImages.bulkCreate(
      images.map((image) => ({
        postId: post.id,
        src: STORAGE_PATH + STORAGE_POST_IMAGES_PATH + image.filename,
      }))
    );

  return res.json({ success: true });
};

// INDEX
exports.index = async (req, res) => {
  const posts = await Post.findAll({
    where: { deleted: false },
    include: ["tags", "themes"],
  });

  return res.json(posts);
};

// SHOW
exports.show = async (req, res) => {
  const post = await Post.findOne({
    where: { id: req.params.id, deleted: false },
    include: ["tags", "themes"],
  });

  if (!post) return res.status(404).json();

  return res.json(post);
};

// UPDATE
exports.update = async (req, res) => {
  const post = await Post.findOne({ where: { userId: req.me.id } });

  if (!post) return res.status(404).json();

  const errors = await req.validation({
    title: post.title != req.body.title && "ifExists|string",
    body: post.body != req.body.body && "ifExists|string",
  });
  if (errors) return res.json({ errors });

  const data = req.only("title", "body");

  await post.update(data);

  return res.json({ success: true });
};

// DELETE
exports.delete = async (req, res) => {
  const post = await Post.findOne({
    where: { id: req.params.id, userId: req.me.id },
  });

  if (!post) return res.status(404).json();

  const destroy = req.body.destroy && post.deleted;

  if (destroy) {
    const imagesForDeleting = await PostImages.findAll({
      where: { postId: post.id },
    });

    if (!imagesForDeleting) return res.status(404).json();

    imagesForDeleting.forEach((img) => {
      try {
        fs.unlinkSync(__dirname + "/../" + img.src);
      } catch (e) {
        console.log(e);
      }
    });

    await PostImages.destroy({ where: { postId: post.id } });

    await PostTheme.destroy({ where: { postId: post.id } });

    await PostTag.destroy({ where: { postId: post.id } });

    await post.destroy();
  } else {
    await post.update({ deleted: !post.deleted });
  }

  return res.json(destroy ? null : post.deleted ? true : false);
};
