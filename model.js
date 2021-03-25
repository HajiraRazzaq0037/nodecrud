
var fs = require('fs');
const resData = JSON.parse(fs.readFileSync(`./data.json`, 'utf-8'));

const findUser = id => resData.find(x => x.id === id);

module.exports = findUser;
