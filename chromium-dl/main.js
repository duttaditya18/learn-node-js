const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio')
const dl = require('download-file-with-progressbar');

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

var downloadFile = (url) => {
    
    var option = {
        filename: 'chromium-sync.exe',
        dir: './',
        onDone: (info) => {
            console.log('done', info);
        },
        onError: (err) => {
            console.log('Error', err.message);
        },
        onProgress: (curr, total) => {
            process.stdout.write("\r\x1b[K")
            // 1048576 is the number of bytes in a megabyte.
            process.stdout.write(`Progress: ${(curr / total * 100).toFixed(2)} %   |   ${(curr / 1048576).toFixed(2)} MB / ${(total / 1048576).toFixed(2)} MB`);
        },
    }
    var dd = dl(url, option);
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