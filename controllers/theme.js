const { Theme } = require('../database/models/index');

exports.index = async (req, res) => {
  const themes = await Theme.findAll();

  return res.json(themes);
};
