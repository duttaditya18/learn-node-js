const cheerio = require("cheerio");
const request = require("request");

// http://cheenta.wiziq.com/online-class/6087018
// http://cheenta.wiziq.com/online-class/6087019

request(
  {
    method: "GET",
    url: "http://cheenta.wiziq.com/online-class/6087019"
  },
  (err, res, body) => {
    if (err) return console.error(err);

    console.log(res.statusCode);
    console.log(body);
    console.log(res.headers);
    let $ = cheerio.load(body);
    let h1 = $("h1");
    console.log(h1.text());
  }
);
