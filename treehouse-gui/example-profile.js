var profile = require("./profile.js");

var studentProfile = new profile.get("chalkers");

studentProfile.on("end", console.dir);

studentProfile.on("error", console.error);