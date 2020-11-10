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
