DROP DATABASE IF EXISTS wiabox_nodes;
CREATE DATABASE wiabox_nodes CHARACTER SET 'utf8';


USE wiabox_nodes;


CREATE TABLE Node (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  lat DECIMAL(10,8) NOT NULL, 
  long DECIMAL(11,8) NOT NULL
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated DATETIME DEFAULT NOW() ON UPDATE NOW(),
  community INT UNSIGNED DEFAULT -1,
  PRIMARY KEY (id)
) Engine=INNODB;


CREATE TABLE Community (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(250) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated DATETIME DEFAULT NOW() ON UPDATE NOW(),
  creator INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_CommunityNode FOREIGN KEY (creator) REFERENCES Node(id)
) Engine=INNODB;


CREATE TABLE Platform(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(10),
  token VARCHAR(5)
) ENGINE=INNODB;

INSERT INTO Platform (name,token) VALUES ('wiabox-map','password');


/* Création de l'utilisateur node pour cette bd */
DROP User wiabox IF EXISTS;
CREATE USER wiabox IDENTIFIED WITH mysql_native_password BY 'wiabox';
GRANT ALL PRIVILEGES ON wiabox_nodes.* TO wiabox;
FLUSH PRIVILEGES;

