var stringTable = require('./stringTable.js')


var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

//Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
  colorze: true
});
logger.level = 'debug';

//Initialize discord bot
var bot = new Discord.Client({
  token: auth.token,
  autorun: true
});
bot.on('ready', function (evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + '-(' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
  //Our bot will need to know if it will execute a command
  //it will listen to msgs that start with !
  if (message.substring(0, 1) == '!') {
    var args = message.substring(1).split(' '); //split into array
    var cmd = args[0]; //the command

    switch(cmd) {
      // !ping
      case 'help':
        console.log('help'); //what command was called
        bot.sendMessage({
          to: channelID,
          //backticks to create multi-line string
          message: `Commands(starts with !):
          op to get link of op.gg of a username
          build to add a word to a string others have added to
          buildClear to clear the build string`
        });
        break;
      case 'op':
        console.log('op'); //see what command is called
        //error check if args is correct
        if(args.length == 2) {
          bot.sendMessage({
            to: channelID,
            message: "https://na.op.gg/summoner/userName=" + args[1]
          });
        }
        else {
          bot.sendMessage({
            to: channelID,
            message: "Incorrect usage, do !op [username]"
          });
        }
        break;
      case 'build':
        console.log('build');
        //correct arg length is 2
        if(args.length == 2) {
          let word = args[1];
          let newString = stringTable.buildTable(word);
          newString = newString.join(' '); //since it's returned as an array
          console.log(newString);
          bot.sendMessage({
            to: channelID,
            message: newString
          });
        }
        else {
          bot.sendMessage({
            to: channelID,
            message: "Incorrect usage, do !build [word]"
          });
        }
        break;
      case 'buildClear':
        console.log('buildClear');
        stringTable.clearTable();
        break;

    } //ends switch statement
    //now reset args
    args = args.splice(1); //leaves only the first element, removes everything after
  }
});
