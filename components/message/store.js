const Model = require("./model");

function addMessage(message) {
  const myMessage = new Model(message);
  myMessage.save();
}

function getMessages(filterChat) {
  return new Promise((resolve, reject) => {
    let filter = {};

    if (filterChat !== null) {
      filter = {
        chat: filterChat
      };
    }
    
    Model.find(filter)
      .populate("user")
      .exec(function(err, populated) {
        if (err) {
          reject(err);
          return false;
        }
        resolve(populated);
      })
  });
}

async function updateText(id, message) {
  const foundMessage = await Model.findOne({
    _id: id
  });

  foundMessage.message = message;
  const newMessage = foundMessage.save();
  return newMessage;
}

function removeMessage(id) {
  return Model.deleteOne({
    _id: id
  });
}

module.exports = {
  add: addMessage,
  list: getMessages,
  updateText,
  remove: removeMessage
};
