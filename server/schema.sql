DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;

USE chat;

CREATE TABLE if not exists rooms (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(16) not null
) ENGINE=InnoDB;

CREATE TABLE if not exists names (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(16) not null
) ENGINE=InnoDB;

CREATE TABLE if not exists messages (
  /* Describe your table here.*/
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  text varchar(255) not null,
  room_id_fk int,
  name_id_fk int not null,
  FOREIGN KEY(room_id) REFERENCES rooms(id),
  FOREIGN KEY(name_id) REFERENCES names(id)
) ENGINE=InnoDB;

/* Create other tables and define schemas for them here! */


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
