const fs = require("fs");

const { User, Theme, Tag, UserAvatar } = require("../database/models/index");

// SHOW
exports.show = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.me.id },
    attributes: { exclude: ["password"] },
    include: [
      "avatar",
      "posts",
      { model: Theme, as: "themes", through: { attributes: [] } },
      { model: Tag, as: "tags", through: { attributes: [] } },
      // показываются только первые теги и темы
    ],
  });

  return res.json(user);
};

// UPDATE
exports.update = async (req, res) => {
  const user = await User.findOne({ where: { id: req.me.id, deleted: false } });

  if (!user) return res.status(404).json();

  const errors = await req.validation({
    firstName: req.me.firstName != req.body.firstName && "ifExists|string",
    lastName: req.me.lastName != req.body.lastName && "ifExists|string",
    email:
      req.me.email != req.body.email && "ifExists|string|email|unique:user",
    tel: req.me.tel != req.body.tel && "ifExists|string|unique:user",
    about: req.me.about != req.body.about && "ifExists|string",
    birthday: req.me.birthday != req.body.birthday && "ifExists|string",
    password: "ifExists|required|string",
    passwordConfirmation: "ifExists|required|string|as:password",
  });
  if (errors) return res.json({ errors });

  const data = req.only(
    "firstName",
    "lastName",
    "email",
    "tel",
    "about",
    "birthday",
    "password"
  );

  await user.update(data);

  return res.json({ success: true });
};

// ADD/UPDATE AVATAR
exports.addUpdateAvatar = async (req, res) => {
  const oldAvatar = await UserAvatar.findOne({ where: { userId: req.me.id } });

  const file = req.file;

  if (!file) return res.status(400).json();

  if (oldAvatar) {
    try {
      fs.unlinkSync(__dirname + "/../" + oldAvatar.src);
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

  return res.json({ success: true });
};

exports.deleteAvatar = async (req, res) => {
  // удалить аватарку из файлов, используюя путь из базы,
  // удалить запись из базы
  const userAvatar = await UserAvatar.findOne({ where: { userId: req.me.id } });

  if (!userAvatar) return res.status(404).json();

  try {
    fs.unlinkSync(__dirname + "/../" + userAvatar.src);
  } catch (e) {
    console.log(e);
  }

  await userAvatar.destroy();

  return res.json({ success: true });
};
