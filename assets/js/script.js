// Main Variables
var song= document.getElementById("song");
var artist= document.getElementById("artist-name");

const getLyrics= require("./getLyrics")
const getSong= require("./getSong")
const options={
    apiKey: "tALbihTgJBec6CH376LubhHIRyMCK9bGm2chS9KUyqj8vUNlt1QG-jFaj5Y4e3uP",
    title: song,
    artistname: artist,
    optimizeQuery:true
}

getLyrics(options).then((lyrics)=>console.log(lyrics));
getSong(options).then((song)=>
console.log(`
${song.lyrics}` )

)

