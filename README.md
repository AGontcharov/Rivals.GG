# Rivals.GG
> Add rivals, analyze summoners, compete on the leaderboard

## Installation

Linux & OS X:

```sh
git clone https://github.com/AGontcharov/rivals.gg.git
cd rivals.gg/
sudo npm install
mysql -u root -p < init.sql
```
Next provide a **config.json** file in the root directory with the necessary crendentials:

```sh
{
  "mysql": {
    "user": "",
    "password": "",
    "database": ""
  },
  "apiKey": "",
  "jwtKey": ""
}
```
You can acquire your own Riot Games Api Key by signing up at https://developer.riotgames.com/

Windows:

```sh
Not yet available
```

## Running

Linux & OS X:

```sh
npm start
Open Chrome (or your favorite browser)
Go to: localhost:3000
```

## Testing
The unit tests for the controllers, services, and directives were implemented using **Jasmine**.
The e2e (end-to-end) will be done using **Protractor** in the future.

All tests are run through **Karma** through a headless broswer (phantomJS) and can be configured inside **karma.conf.js**


Linux & OS X:
```sh
npm test
```

## Meta

Alexander Gontcharov – alexander.goncharov@gmail.com

Website - [www.alexgontcharov.com](http://www.alexgontcharov.com)

[https://github.com/AGontcharov/](https://github.com/AGontcharov/)
