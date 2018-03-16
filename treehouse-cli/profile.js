const https = require('https');
const http = require('http');

function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} total point(s).`;
    console.log(message);
}

function printError(error) {
    console.error(error.message);
}

function getProfile(username) {
    try {
        const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
            if(response.statusCode === 200) {
                let body = "";

                response.on('data', data => {
                    body += data.toString();
                });

                response.on('end', () => {
                    try {
                        const profile = JSON.parse(body);
                        let pointSum = 0;
                        for (var eachPoint in profile.points) {
                            if (profile.points.hasOwnProperty(eachPoint)) {
                                pointSum += parseInt(profile.points[eachPoint]);
                            }
                        }
                        printMessage(username, profile.badges.length, pointSum);
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


module.exports.get = getProfile;