const jwt = require('jsonwebtoken');

const createToken = (_id) => jwt.sign({ _id }, process.env.SECRET_KEY, {
  expiresIn: '1d',
});

module.exports = {
  createToken,
};
