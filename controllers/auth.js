const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../database/models/index');

//  SING-UP
exports.signUp = async (req, res) => {
  const errors = await req.validation({
    firstName: 'required|string',
    lastName: 'ifExists|string',
    email: 'required|string|email|unique:user',
    password: 'required|string',
    passwordConfirmation: 'required|string|as:password',
  });

  if (errors) return res.json({ errors });

  const data = req.only('firstName', 'lastName', 'email', 'password');

  await User.create(data);

  return res.status(201).json({ succes: true });
};

//  SIGN-IN
exports.signIn = async (req, res) => {
  const errors = await req.validation({
    email: 'required|string|email|find:user-email',
    password: 'required|string',
  });

  if (errors) return res.json({ errors });

  const user = await User.findOne({ where: { email: req.body.email } });

  const passwordCompare = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!passwordCompare) return res.json();

  const access_token = await jwt.sign(
    { uid: user.id },
    process.env.JWT_SECRET_USER,
    { expiresIn: '12h' }
  );

  return res.status(201).json(access_token);
};
