const https = require('https');
const http = require('http');

function printError(error) {
    console.error(error.message);
}

function printMessage(ipinfo) {
    const loc = ipinfo.loc.split(',');
    const lat = Math.abs(loc[0]);
    const lon =  Math.abs(loc[1]); 
    const latdir = lat > 0 ? "N" : "S";
    const londir = lon > 0 ? "W" : "E";
    console.log(`Your IP is ${ipinfo.ip} and hostname is ${ipinfo.hostname}.`);
    console.log(`Your Service Provider is ${ipinfo.org}, ${ipinfo.city}, ${ipinfo.region} - ${ipinfo.postal}. (${lat}°${latdir}, ${lon}°${londir})`);
}

function printMessageIP(ipinfo) {
    const loc = ipinfo.loc.split(',');
    const lat = Math.abs(loc[0]);
    const lon =  Math.abs(loc[1]); 
    const latdir = lat > 0 ? "N" : "S";
    const londir = lon > 0 ? "W" : "E";
    console.log(`The IP ${ipinfo.ip} has the hostname : ${ipinfo.hostname}.`);
    console.log(`The IP is located at ${ipinfo.org}, ${ipinfo.city}, ${ipinfo.region} - ${ipinfo.phone || ""}}. (${lat}°${latdir}, ${lon}°${londir})`);
}

if (process.argv.length < 3) {
    try {
        const request = https.get(`https://ipinfo.io/`, response => {
            if(response.statusCode === 200) {
                let body = "";

                response.on('data', data => {
                    body += data.toString();
                });

                response.on('end', () => {
                    try {
                        const ipinfo = JSON.parse(body);
                        printMessage(ipinfo);
                    } catch(error) {
                        printError(error);
                    }
                });
            } else {
                const message = `${response.statusCode} : ${http.STATUS_CODES[response.statusCode]}`;
                const statusCodeError = new Error(message);
                printError(statusCodeError);
            }
        });
        request.on('error', printError);
    } catch(error) {
        printError(error);
    }
} else {
    const query = process.argv[2];
    if (query === '-h' || query === '--help') {
        console.log("usage : npm start                   : displays info about your IP");
        console.log("usage : npm start [IP]              : displays info about the specified IP");
        console.log("usage : npm start -h | --help       : displays help message");
    } else {
        try {
            const request = https.get(`https://ipinfo.io/${query}`, response => {
                if(response.statusCode === 200) {
                    let body = "";

                    response.on('data', data => {
                        body += data.toString();
                    });

                    response.on('end', () => {
                        try {
                            const ipinfo = JSON.parse(body);
                            printMessageIP(ipinfo);
                        } catch(error) {
                            printError(error);
                        }
                    });
                } else {
                    const message = `${response.statusCode} : ${http.STATUS_CODES[response.statusCode]}`;
                    const statusCodeError = new Error(message);
                    printError(statusCodeError);
                }
            });
            request.on('error', printError);
        } catch(error) {
            printError(error);
        }
    }
}
