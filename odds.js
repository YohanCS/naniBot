exports.oddCheck = function() {
  'use strict';
  const fs = require('fs'); //use fs module to read json
  const rawData = fs.readFileSync('./oddsData.json'); //gives hexcode
  const data = JSON.parse(rawData); //now can use it in object code
  return [data["user1"], data["user2"]]; //return array of 2 elements to latter check
}

exports.oddWrite = function(user, number) {
  const fs = require('fs');
  console.log("user: " +user);
  console.log("number: " +number);
  //since data is an object we are given user1 and user2 properties
  //ideally user is 1 or 2
  let rawData1 = fs.readFileSync('oddsData.json'); //gives hexcode
  let data1 = JSON.parse(rawData1); //now can use it in object code
  data1[user] = number;
  rawData1 = JSON.stringify(data1, null, 2); //null, 2 is to make it readable
                                                //stringify to put it back into JSON code
  fs.writeFileSync('oddsData.json', rawData1);
}

exports.oddClear = function() {
  const fs = require('fs');
  let rawData2 = fs.readFileSync('oddsData.json');
  let data2 = JSON.parse(rawData2);
  data2["user1"] = "havent set number yet";
  data2["user2"] = "other hasnt set number";
  rawData2 = JSON.stringify(data2, null, 2);

  fs.writeFileSync('oddsData.json', rawData2);
}

exports.writeUser = (number) => {
  const fs = require('fs');
  console.log("userID: " + number);
  let rawData = fs.readFileSync('oddsData.json'); //gives hexcode
  let data = JSON.parse(rawData); //now can use it in object code
  data["userID"] = number;
  rawData = JSON.stringify(data, null, 2); //null, 2 is to make it readable
                                                //stringify to put it back into JSON code
  fs.writeFileSync('oddsData.json', rawData);
}
exports.getUser = () => {
  const fs = require('fs');
  let rawData = fs.readFileSync('oddsData.json');
  let data = JSON.parse(rawData);
  return data["userID"];
}
