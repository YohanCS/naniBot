exports.buildTable = function(s) {
  'use strict';
  const fs = require('fs'); //to use fs module
  //now to read
  const rawData = fs.readFileSync('stringData.json');
  const data = JSON.parse(rawData); //parse it into readable code
  //data shall be an array of subsequent strings, and this will push
  //to said array
  data["bigString"].push(s);
  writeData(data);
  return data["bigString"];
}

function writeData(data) {
  const fs = require('fs');
  let rawData = JSON.stringify(data, null, 2); //null, 2 is to make it readable
  fs.writeFileSync('stringData.json', rawData);
}

exports.clearTable = function() {
  'use strict';
  const fs = require('fs'); //to use fs module
  //now to read
  const rawData = fs.readFileSync('stringData.json');
  const data = JSON.parse(rawData); //parse it into readable code
  //data shall be an array of subsequent strings, and this will push
  //to said array

  data["bigString"] = []; //reset it
  writeData(data);
}
