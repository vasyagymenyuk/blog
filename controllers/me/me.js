const {
  User,
  Post,
  PostTheme,
  UserTheme,
} = require('../../database/models/index');

exports.show = async (req, res) => {
  const userData = await User.findOne({
    where: { id: req.me.id },
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Post,
        as: 'posts',
      },
      {
        model: UserTheme,
        as: 'userThemes',
      },
    ],
  });

  return res.json(userData);
};

// exports.update = async (req, res) => {};
