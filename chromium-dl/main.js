const https = require('https');
const fs = require('fs');
const anchorme = require("anchorme")

var downloadFile = (url, cb) => {
    var file = fs.createWriteStream('chromium-sync.exe');
    var request = https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close(cb);
        });
    }).on('error', (err) => {
        fs.unlink(dest);
        console.log("Error: " + err.message);
    });
};

const options = {
    host: 'api.github.com',
    path: '/repos/henrypp/chromium/releases/latest',
    headers: { 'User-Agent': 'Mozilla/5.0' }
};

https.get(options, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        const url = JSON.parse(data).assets[0].browser_download_url;
        downloadFile(url, () => {
            
        });
        console.log(url);
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});