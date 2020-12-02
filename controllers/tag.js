const { Tag } = require('../database/models/index');

// CREATE
exports.create = async (req, res) => {
  const errors = req.validation({
    tag: 'required|string|unique:tag',
  });

  if (errors) return res.json({ errors });

  await Tag.create({ tag: req.body.tag });
};

// INDEX
exports.index = async (req, res) => {
  const tags = await Tag.findAll();

  return res.json(tags);
};
// SHOW
exports.show = async (req, res) => {
  // const tags = await Tag.findAll();
  // return res.json(tags);
};
