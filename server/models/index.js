var db = require('../db');

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function () {
      new Promise((resolve, reject) => {
        var queryString = `SELECT m.text text, r.name roomname, u.name username
                          from messages m join rooms r on (m.room_id_fk = r.id)
                          join users u on (m.user_id_fk = u.id);`;
        var queryArgs = [];
        db.dbConnection.query(queryString, queryArgs, function(err, results) {
          if(err) {
            reject(err);
            return;
          }
          resolve(results);
        });
      }).then(results => {
        console.log('results on get:', JSON.stringify(results));
        return results;
      }).catch(err => {
        throw new Error(err);
      });
    },
    // a function which can be used to insert a message into the database
    post: function (messageObj) {
      console.log('messageObj on post:', messageObj);
      // use promise all to do posts to rooms and users
      // upon then, do promise insert using select id of rooms and users
      var queryInsertUser = 'INSERT ignore INTO users(name) values(?)';
      var queryInsertUserArgs = [messageObj.name];
      var queryInsertRoom = 'INSERT ignore INTO rooms(name) values(?)';
      var queryInsertRoomArgs = [messageObj.room];
      var queryInsertMessage = `insert into messages(text, user_id_fk, room_id_fk)
                                values (?,(select id from users where name=?),(select id from rooms where name=?))`;
      var queryInserMessageArgs = [messageObj.message, messageObj.user, messageObj.room];
      Promise.all([
        db.dbConnection.query(queryInsertUser, queryInsertUserArgs, function(err, results) {
          if(err) {
            reject(err);
          } else {
            resolve(results);
          }
        }),
        db.dbConnection.query(queryInsertRoom, queryInsertRoomArgs, function(err, results) {
          if(err) {
            reject(err);
          } else {
            resolve(results);
          }
        })
      ]).then((results) => {
        // promise
        new Promise((resolve, reject) => {
          db.dbConnection.query(queryInsertMessage, queryInserMessageArgs, function(err, results) {
            if(err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        }).then((results) => {
          console.log('successful insert into messages:', results);
        });
      }).catch((err) => {
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
