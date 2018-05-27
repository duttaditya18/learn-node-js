const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio')

var redirectLinkFinder = (url) => {
    https.get(url, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            const $ = cheerio.load(data);
            var url = $('a').attr('href'); 
            downloadFile(url);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

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

var options = {
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
        var url = JSON.parse(data).assets[0].browser_download_url;
        redirectLinkFinder(url);
        console.log(url);
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});