const https = require('https');

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
        // downloadFile(url);
        console.log(url);
    });
 
}).on("error", (err) => {
    console.log("Error: " + err.message);
});