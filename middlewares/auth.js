const { User } = require('../database/models/index');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const { access_token } = req.headers;

  if (!access_token) return res.status(400).json();

  try {
    const payload = jwt.verify(access_token, process.env.JWT_SECRET_USER);

    req.me = await User.findOne({
      where: { id: payload.uid },
      attributes: { exclude: ['password'] },
    });
    if (!req.me) return res.status(404).json();

    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json();
  }
};
