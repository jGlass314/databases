var db = require('../db');

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function (callback) {
      new Promise((resolve, reject) => {
        var queryString = `SELECT m.text text, r.name roomname, u.name username, m.timestamp createdAt
                          FROM messages m JOIN rooms r ON (m.room_id_fk = r.id)
                          JOIN users u ON (m.user_id_fk = u.id)
                          ORDER BY m.timestamp DESC`;
        var queryArgs = [];
        db.dbConnection.query(queryString, queryArgs, function(err, results) {
          if (err) {
            console.error('error on query:', queryString);
            reject(err);
            return;
          }
          resolve(results);
        });
      }).then(results => {
        // console.log('results on get:', JSON.stringify(results));
        callback(results);
      }).catch(err => {
        console.error('Error:', err);
        throw new Error(err);
      });
    },
    // a function which can be used to insert a message into the database
    post: function (messageObj, callback) {
      var queryInsertUser = 'INSERT ignore INTO users(name) values(?)';
      var queryInsertUserArgs = [messageObj.username];
      var queryInsertRoom = 'INSERT ignore INTO rooms(name) values(?)';
      var queryInsertRoomArgs = [messageObj.roomname];
      var queryInsertMessage = `insert into messages(text, user_id_fk, room_id_fk)
                                values (?,(select id from users where name=?),(select id from rooms where name=?))`;
      var queryInserMessageArgs = [messageObj.text, messageObj.username, messageObj.roomname];
      Promise.all([
        db.dbConnection.query(queryInsertUser, queryInsertUserArgs),
        db.dbConnection.query(queryInsertRoom, queryInsertRoomArgs)
      ]).then((results) => {
        // promise
        new Promise((resolve, reject) => {
          db.dbConnection.query(queryInsertMessage, queryInserMessageArgs, function(err, results) {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        }).then((results) => {
          console.log('successful insert into messages:', results);
          callback(results);
        });
      })
        .catch((err) => {
          console.error('error on insertion', err);
        });
    }
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};
