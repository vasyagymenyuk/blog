const { User, Theme, Tag, UserAvatar } = require('../database/models/index');
const fs = require('fs');

// SHOW
exports.show = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.me.id },
    attributes: { exclude: ['password'] },
    include: [
      'avatar',
      'posts',
      { model: Theme, as: 'themes', through: { attributes: [] } },
      { model: Tag, as: 'tags', through: { attributes: [] } },
    ],
  });

  return res.json(user);
};

// UPDATE
exports.update = async (req, res) => {
  const user = await User.findOne({ where: { id: req.me.id, deleted: false } });

  if (!user) return res.status(404).json();

  const errors = await req.validation({
    firstName: req.me.firstName != req.body.firstName && 'ifExists|string',
    lastName: req.me.lastName != req.body.lastName && 'ifExists|string',
    email:
      req.me.email != req.body.email && 'ifExists|string|email|unique:user',
    tel: req.me.tel != req.body.tel && 'ifExists|string|unique:user',
    about: req.me.about != req.body.about && 'ifExists|string',
    birthday: req.me.birthday != req.body.birthday && 'ifExists|string',
    password: 'ifExists|required|string',
    passwordConfirmation: 'ifExists|required|string|as:password',
  });
  if (errors) return res.json({ errors });

  const data = req.only(
    'firstName',
    'lastName',
    'email',
    'tel',
    'about',
    'birthday',
    'password'
  );

  await user.update(data);

  return res.json({ success: true });
};

// ADD/UPDATE AVATAR
exports.addUpdateAvatar = async (req, res) => {
  console.log('CONTROLLER');

  const oldAvatar = await UserAvatar.findOne({ where: { userId: req.me.id } });

  const file = req.file;

  if (oldAvatar) {
    try {
      fs.unlinkSync(__dirname + '/../' + oldAvatar.src);
    } catch (e) {
      console.log(e);
    }

    await oldAvatar.destroy();
  }

  const { STORAGE_PATH, STORAGE_AVATARS_PATH } = process.env;

  await UserAvatar.create({
    userId: req.me.id,
    src: STORAGE_PATH + STORAGE_AVATARS_PATH + file.filename,
  });

  return res.json({ succes: true });
};
