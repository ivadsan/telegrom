const Model = require("./model");

function addUser(user) {
  const newUser = new Model(user);
  return newUser.save();
}

function getUsers() {
  return Model.find();
}

module.exports = {
  add: addUser,
  list: getUsers
};
