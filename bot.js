var stringTable = require('./stringTable.js')
var odds = require('./odds.js')


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
          buildClear to clear the build string
          joined to see date a user has joined
          odds to start a What are the odds game!
          done when both people have submitted their numbers
          purge but deletes in batches of 5 so its not abused`);
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
        if(args.length == 1) {
          msg.reply("Incorrect usage, do !build [word]+")
        }
        else {
          let word = args.slice(1);
          word = word.join(' ');
          let newString = stringTable.buildTable(word); //returns all of it
          newString = newString.join(' '); //since it's returned as an array
          console.log(newString);
          msg.channel.send(newString);
        }
        break;
      case 'buildClear':
        console.log('buildClear');
        stringTable.clearTable();
        break;
      case 'joined':
        console.log('joined');
        const mention = msg.mentions.members.first();
        //find mention
        if(args.length < 2 || mention == null) { //could have used msg.isMemberMentioned()
          msg.channel.send("need to mention a user")
          break;
        }
        msg.channel.send(mention.joinedAt.toString().match(/.*(?=G)/));
        console.log("finish joined");
        break;
      case 'odds':
        console.log('odd');
        odds.oddClear();
        if(args.length < 2) {
          msg.channel.send("mention someone then put a number after ex:[!odds @user 5]");
          break;
        }
        msg.channel.send("Doing it out of " + msg.content.match(/\d+$/)); //numbers at end
        const mentionOdds = msg.mentions.members.first(); //returns person mentioned
        msg.author.send("Tell me ur number in format !number [number]");
        mentionOdds.user.send("Tell me ur number in format !number [number]");
        odds.writeUser(msg.author.id);
        //user2 = mentionOdds.user.id; only store user1 id now who called
        break;
      case 'number': //check if person giving us the number is original or
                    //mention and then write to JSON
        console.log('number');
        if(msg.author.id == odds.getUser()) {
          //original user who called command
          odds.oddWrite("user1", args[1]);
        }
        else {
          odds.oddWrite("user2", args[1]);
        }
        break;
      case 'done': //both people submitted numbers so check the properties of JSON file
        console.log('done');
        const oddsArray = odds.oddCheck();
        if(oddsArray[0] == oddsArray[1]) {
          msg.channel.send("You guys picked the same number! " + oddsArray[0]);
        } else {
          msg.channel.send("Different numbers: " + oddsArray[0] + ", " + oddsArray[1] );
        }
        break;
      case 'purge':
        console.log('purge');
        msg.channel.bulkDelete(5);


    } //ends switch statement
    //now reset args
    args = args.splice(1); //leaves only the first element, removes everything after
  }
});
