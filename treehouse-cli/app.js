const profile = require('./profile.js');

const users = process.argv.slice(2);
users.forEach(profile.get);

// chalkers, allenholligan, davemcfarland, elizabethkozup, allessi, alenaholligan, benjakuben, craigsdennis