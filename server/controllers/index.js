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
      models.messages.get((results) => {
        headers['Content-Type'] = 'application/json';
        res.writeHead(200, headers);
        res.end(JSON.stringify({'results': results}));
      });
    },
    // a function which handles posting a message to the database
    post: function (req, res) {
      let body = [];
      req.on('error', (err) => {
        console.error(err);
      });
      req.on('data', (chunk) => {
        body.push(Buffer(chunk));
      });
      req.on('end', () => {
        body = JSON.parse(Buffer.concat(body).toString());
        for (var key in body) {
          console.log(key, ':', body[key]);
        }
        console.log('body:', body);
        if (body.roomname === undefined) {
          body.roomname = 'main';
        }
        models.messages.post(body, (results) => {
          console.log('post results:', results);
          res.writeHead(201, headers);
          // response.end(results);
          res.end();
        });
      });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};
