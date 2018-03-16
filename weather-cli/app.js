const weather = require('./weather.js');

let queryStart = "";

if(process.argv.slice(2).length === 1) {
    queryStart = process.argv.slice(2).join(" ");
} else if(process.argv.slice(2).length === 0) {
    console.log("usage : node app.js [City] [Country]");
    console.log("usage : node app.js [City]");
    return;
} else {
    queryStart = process.argv.slice(2).slice(0, -1).join(" ") + ',' + process.argv.slice(-1)[0];
}

const query = queryStart;

weather.get(query);