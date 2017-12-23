var models = require('../models');

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      // be sure to JSON.stringify res data in here
    },
    // a function which handles posting a message to the database
    post: function (req, res) {
      // be sure to JSON.parse on req data in here
      // if(messageObj.room === undefined) {
      //   messageObj.room = 'main';
      // }
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};
