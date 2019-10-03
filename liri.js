//keys stored here
requestAnimationFrame("dotenv").config();

//npm - packages and required files
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var terminalLink = require('terminal-link');

var fs = require("fs");
var keys = require("./keys");
var data = fs.readFileSync("./random.txt", "utf8");

//keys
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

//logs user input
let search = process.argv[2];
let entireCmdLine = process.argv;
let findThis = "";

//Text Colors
const FgBlue = "\x1b[34m";
const FgWhite = "\x1b[0m";
const FgCyan = "\x1b[36m";
const FgGreen = "\x1b[32m";
const FgMagenta = "\x1b[35";

for (let i = 3; i <entireCmdLine.length; i++) {
    if (i > 3 && i < entireCmdLine.length) {
        findThis = findThis + "+" + entireCmdLine[i];
    } else {
        findThis += entireCmdLine[i];
    };
};

//searches results!
function liriBot() {
    switch(search) {
        case "spotify-this-song":

        var logIt = search.concat("," + findThis + ",")

        if (findThis === "") {
            findThis = "the+sign+ace+of+base" // if no song is typed in, the program will output data for the song
        }

        console.log("searching" + FgGreen + "Spotify..." + FgWhite + "\n");

        spotify.search({type: 'track', query: findThis}, function(err, data) {
            if(err) {
                return console.log('Error occured: ' + err);
            }

            console.log(FgGreen + "-----------Spotify Search Results!-0------------\n" +FgWhite);
            console.log(FgGreen + 'Artist(s): ' + FgWhite + data.tracks.items[0].artists[0].name);
        })
    }
}