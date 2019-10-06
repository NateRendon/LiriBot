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
            console.log(FgGreen + 'Song: ' + FgWhite +data.tracks.items[0].name);
            console.log(FgGreen + 'Album: ' + FgWhite + data.tracks[0].album.name);
            console.log(terminalLink(FgGreen + 'Preview' + FgWhite, daya.tracks.items[0].artists[0].external_urls.spotify));
            console.log(FgGreen + "\n-----------------------------" + Fgwhite);
            fs.appendFile("random.txt", logIt, function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("\nrandom.txt was updated!\n");
            });
        });
        break;

        case "movie-this":

        if (findThis === "") {
            findThis = "Monty+Python+and+the+Holy+Grail" // if the user doesnt type in a movie in, it will search for monty python and the holy grail
        }

        var queryUrl = "http://www.omdbapi.com/?t=" + findThis + "&y=&plot=short&apikey=" + keys.omdb.key;
        var logIt = search.concat("," + findThis + ",")

        console.log("Searching " + FgBlue + "OMBD.." + FgWhite + "\n")

        request(queryUrl, function(error, response, body) {

            if (error) {
                console.log(error);
            } else if (!error && response.statusCode === 200 && JSON.parse(body).Ratings !== undefined) {
                console.log(FgBlue + "----------Your Movie Search Results----------\n" + FgWhite);
                    console.log(FgBlue + "Year: " + FgWhite + JSON.parse(body).Year);
                    console.log(FgBlue + "Title: " + FgWhite + JSON.parse(body).Title);
                    console.log(FgBlue + "Actors: " + FgWhite + JSON.parse(body).Actors);
                    console.log(FgBlue + "Country: " + FgWhite + JSON.parse(body).Country);
                    console.log(FgBlue + "Language: " + FgWhite + JSON.parse(body).Language);
                    console.log(FgBlue + "IMDB Rating: " + FgWhite + JSON.parse(body).imdbRating);
                    console.log(FgBlue + "Rotten Tomatoes Rating: " + FgWhite + JSON.parse(body).Ratings[1].Value);
                    console.log(FgBlue + "Plot: " + FgWhite + JSON.parse(body).Plot);
                    console.log(FgBlue + "\n---------------------------------------------" + FgWhite);
                    fs.appendFile("random.txt", logIt, function(err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("\nrandom.txt was updated!\n");
                    });
                } else {
                    console.log("That movie does not exists in the " + FgBlue + " OMBD.." + FgWhite + "\n")
                }
        });
        break;

        case "do-what-it-says":

        fs.readFile("random.txt", "utf8", function(error, data) {

            var dataArr = data.split(",");
            var randomPull = Math.floor(Math.random() * (dataArr.length - 1));
            console.log("You randomly pulled with number: " + rnadomPull + "\n");

            if(error) {
                return console.log(error);
            }

            if (randomPull % 2 !== 0) {
                earch = dataArr[randomPull];
                findThis = dataArr[randomPull + 1];
            } else if (randomPull % 2 === 0 && randomPull !== 0) {
                search = dataArr[randomPull - 1];
                findThis = dataArr[randomPull];
            } else {
                search = dataArr[randomPull];
            }

            console.log("Your " + FgGreen + "R" + FgCyan + "a" + FgBlue + "n" + FgMagenta + "d" + FgBlue + "o" + FgCyan + "m" + FgWhite + " search has begun.\n")        
        
            liriBot();
        });
        
        break;

        default:
            cconsole.log("Not a valid input. Please use the following options: " + FgGreen + "\n * spotify-this-song " + FgCyan + "\n * my-tweets " + FgBlue + "\n * movie-this " + FgMagenta + "\n * do-what-it-says" + FgWhite)
            break;
        };
};


liriBot();