CREATE DATABASE rivals_gg;
use rivals_gg;

DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
 	`ID` int(11) NOT NULL AUTO_INCREMENT,
  	`Username` varchar(255) NOT NULL,
  	`Password` varchar(255) NOT NULL,
  	`Email` varchar(255) NOT NULL,
  	PRIMARY KEY (`ID`)
);

DROP TABLE IF EXISTS `Summoner`;

CREATE TABLE `Summoner` (
	`SummonerID` int(11) NOT NULL,
	`ID` int(11) NOT NULL,
	`Name` varchar(255) NOT NULL,
	`ProfileIconID` int(11) NOT NULL,
	`Region` varchar(255) NOT NULL,
	`Level` int(11) NOT NULL,
	`RevisionDate` bigint(20) NOT NULL,
	PRIMARY KEY (`SummonerID`),
	FOREIGN KEY (`ID`) REFERENCES `User` (`ID`)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

DROP TABLE IF EXISTS `Solo`;

CREATE TABLE `Solo` (
	`SummonerID` int(11) NOT NULL,
	`Icon` varchar(225) NOT NULL,
	`League` varchar(255) NOT NULL,
	`Tier` varchar(255) NOT NULL,
	`Division` varchar(255) NOT NULL,
	`LeaguePoints` int(11) NOT NULL,
	`Wins` int(11) NOT NULL,
	`Losses` int(11) NOT NULL,
	PRIMARY KEY (`SummonerID`),
	FOREIGN KEY (`SummonerID`) REFERENCES `Summoner` (`SummonerID`)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

DROP TABLE IF EXISTS `Flex`;

CREATE TABLE `Flex` (
	`SummonerID` int(11) NOT NULL,
	`Icon` varchar(225) NOT NULL,
	`League` varchar(255) NOT NULL,
	`Tier` varchar(255) NOT NULL,
	`Division` varchar(255) NOT NULL,
	`LeaguePoints` int(11) NOT NULL,
	`Wins` int(11) NOT NULL,
	`Losses` int(11) NOT NULL,
	PRIMARY KEY (`SummonerID`),
	FOREIGN KEY (`SummonerID`) REFERENCES `Summoner` (`SummonerID`)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);