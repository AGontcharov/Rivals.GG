CREATE DATABASE rivals_gg;
use rivals_gg;

DROP TABLE IF EXISTS 'user';

CREATE TABLE 'user' (
 	'ID' int(11) NOT NULL AUTO_INCREMENT,
  	'Email' varchar(255) NOT NULL,
  	'Username' varchar(255) NOT NULL,
  	'Password' varchar(255) NOT NULL,
  	PRIMARY KEY ('ID')
);

DROP TABLE IF EXISTS 'summoner';

CREATE TABLE 'summoner' (
	'summoner_name' varchar(255) NOT NULL,
	'summoner_id' int(11) NOT NULL,
	'profile_icon_id' int(11) NOT NULL,
	'summoner_level' int(11) NOT NULL,
	'revision_date' bigint(20) NOT NULL,
	'region' varchar(255) NOT NULL
	PRIMARY KEY ('')
);