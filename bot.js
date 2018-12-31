var stringTable = require('./stringTable.js')


var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');

//Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
  colorze: true
});
logger.level = 'debug';

//Initialize discord bot
var bot = new Discord.Client();
//log in bot
bot.login(auth.token);

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  //Our bot will need to know if it will execute a command
  //it will listen to msgs that start with !
  if (msg.content.substring(0, 1) == '!') {
    var args = msg.content.substring(1).split(' '); //split into array
    var cmd = args[0]; //the command

    switch(cmd) {
      // !ping
      case 'help':
        console.log('help'); //what command was called
        msg.reply(`Commands(starts with !):
          op to get link of op.gg of a username
          build to add a word to a string others have added to
          buildClear to clear the build string`);
        break;
      case 'op':
        console.log('op'); //see what command is called
        //error check if args is correct
        if(args.length == 2) {
          msg.channel.send("https://na.op.gg/summoner/userName=" + args[1]);
        }
        else {
          msg.reply("Incorrect usage, do !op [username]");
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
          msg.channel.send(newString);
        }
        else {
          msg.reply("Incorrect usage, do !build [word]")
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
