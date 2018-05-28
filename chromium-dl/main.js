const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio')
const dl = require('download-file-with-progressbar');
const chalk = require('chalk');
var progress = require('progress');

var redirectLinkFinder = (url) => {
    process.stdout.write(chalk.keyword('magenta')('Obtaining URL.'));
    https.get(url, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            const $ = cheerio.load(data);
            var url = $('a').attr('href');
            process.stdout.write('\r\x1b[K')
            process.stdout.write(chalk.keyword('magenta')('URL Obtained')  + ' : ' +  chalk.keyword('gray')(url) + '\n');
            downloadFile(url);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

var downloadFile = (url) => {
    process.stdout.write(chalk.keyword('magenta')('Downloading. \n'));
    var dank = 0;
    var option = {
        filename: 'chromium-sync.exe',
        dir: './',
        onDone: (info) => {
            process.stdout.write('\r\x1b[K')
            process.stdout.write(chalk.keyword('magenta')('Downloading Complete.'));
        },
        onError: (err) => {
            console.log('Error', err.message);
        },
        onProgress: (curr, total) => {
            var bar = new progress('[:bar] ' + chalk.keyword('green')(':percent') + chalk.keyword('yellow')(`  ${(curr / 1048576).toFixed(2)} MB`) + chalk.keyword('gray')(` / ${(total / 1048576).toFixed(2)} MB`), {
                complete: chalk.bgKeyword('white').keyword('black')(' '),
                incomplete: chalk.keyword('gray')('-'),
                width: 50,
                total: total / 1048576
            });
            dank = curr - dank;
            bar.tick(curr / 1048576);
            // deletes the previous line
            // process.stdout.write('\r\x1b[K')
            // 1048576 is the number of bytes in a megabyte.
            // process.stdout.write('Progress: ' + `${(curr / total * 100).toFixed(2)} %` + `${(curr / 1048576).toFixed(2)} MB / ${(total / 1048576).toFixed(2)} MB`);
        },
    }
    var dd = dl(url, option);
};

process.stdout.write('\r\x1b[K')
process.stdout.write(chalk.keyword('magenta')('Finding Package.'));

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
        process.stdout.write('\r\x1b[K')
        process.stdout.write(chalk.keyword('magenta')(`Package Found`) + ' : ' + chalk.keyword('gray')(url) + '\n');
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});