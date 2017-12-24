var models = require('../models');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      console.log('controller get req:', req.url);
      models.messages.get((results) => {
        // be sure to JSON.stringify res data in here
        // results = JSON.stringify(results)
        console.log('results:', results);
        headers['Content-Type'] = 'application/json';
        res.writeHead(200, headers);
        res.end(JSON.stringify({'results': results}));
      });
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
