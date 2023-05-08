const User = require("./model");

const create = (newUserObj) => {
  const user = new User(newUserObj);
  return user.save();
};

const getByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
};

module.exports = { create, getByEmail }


