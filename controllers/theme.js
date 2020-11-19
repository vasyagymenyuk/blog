const { Theme } = require('../database/models/index');

exports.index = async (req, res) => {
  const themes = await Theme.findAll();

  if (!themes) return res.status(404).json();

  return res.status(201).json(themes);
};
