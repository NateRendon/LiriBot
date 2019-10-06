var FgYellow = "\x1b[33m"
var FgWhite = "\x1b[37m"
console.log('\nYour ' + FgYellow + 'keys' + FgWhite + ' are loaded\n');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
  key: process.env.OMDB_API_KEY
};