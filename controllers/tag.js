const { Tag, UserTag } = require('../database/models/index');

// ПОКАЗЫВАЕТ ВСЕ ТЕГИ
exports.index = async (req, res) => {
  const tags = await Tag.findAll();

  if (!tags) return res.status(404).json();

  return res.status(201).json(tags);
};

//  ПРИ ДОБАВЛЕНИИ ТЕГОВ К ПОСТУ ПОКАЗЫВАЕТ ПОЛЬЗОВАТЕЛЮ ТЕГИ, КОТОРЫЕ ОН ИСПОЛЬЗУЕТ
exports.showUserTags = async (req, res) => {
  const userTags = await UserTag.findAll({ where: { userId: req.me.id } });

  if (!userTags) return res.status(404).json();

  return res.status(201).json(userTags);
};
