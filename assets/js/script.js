<<<<<<< HEAD
=======
// https://api.genius.com/songs/378195?access_token=brqqAVknBmcQm4VTlCwJYeg72QX_Lbtk7LvoK2OKmd_3Y8PWLN17gkME0t49sTzy

//client_id: cl6GyWa_P23cmW9_gSv8meKZeJLiWTw9gBH_JxQPp496YTD_AitGjmXLYVCBTq3P
//client_secret: bQsW80M7UE9yojSWAz6XpTJrq7-i4-fHB72YRLtzn8bbVo4dg8qEr3pKffPoyRF5uk4dJc8qLkNUxa6wc6mvEg
// client_access_token: qkUOvBENK-6pmKNGA_YQS7HzgA4TobMt6sSexxmSahe_jQRmkAQarRP4YYWNVGKW
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'a2ed194c9amsh205ae198b8ca901p15fd30jsn29e238167d2e',
// 		'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
// 	}
// };


// Youtube API search
// documentation
//https://developers.google.com/youtube/v3/docs/search
//https://developers.google.com/youtube/v3/docs
var getvidurl = "https://www.googleapis.com/youtube/v3/search?part=snippet?q="
var searchinput = document.getElementById("search-input").value;
var apikey = "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"

console.log(apikey)

var requesturl = (getvidurl + searchinput + ("?access_token=" + apikey));

console.log(requesturl)

var getVideo = function () {
    var requesturl = (getvidurl + searchinput + ("?access_token=" + apikey));
    var videoUrl = requesturl
    var searchinput = document.getElementById("search-input").value;
    var apikey = "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";
    fetch(videoUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
            });
        } else {
            alert("Error:" + response.statusText);
        };
    );
    };
    getVideo();

>>>>>>> ced74bdc0113238dbab97d4cfa6229a1461fcbef
var displayEl = document.getElementById("display-content");
var getGenius = function (artistInput) {
  var randNum = Math.floor(Math.random() * 10);
  var searchArtist = document.querySelector("#search-input").value;
  var Url = `https://api.genius.com/search?q=${searchArtist}&access_token=brqqAVknBmcQm4VTlCwJYeg72QX_Lbtk7LvoK2OKmd_3Y8PWLN17gkME0t49sTzy`;

  fetch(Url).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        const hits = data.response.hits.filter((hit) =>
          hit.result.artist_names
            .toLowerCase()
            .includes(artistInput.toLowerCase())
        );

        console.log(data);

        var artistName = hits[randNum].result.artist_names;

        console.log(artistName, "name");
        var lyrics = hits[randNum].result.url;

        var image = hits[randNum].result.song_art_image_url;

        var hitSongs = hits[randNum].result.primary_artist.url;

        let templateCurrent = "";

        templateCurrent += `
        <div class="display-contents">
        
        <p class="artist-name">  <span>${artistName}</span><p> 

        <img  class="img-width" src="${image}"/>
        </div>
        `;
        displayEl.innerHTML = templateCurrent;

        var languageButtonsEl = document.querySelector("#language-buttons");

        var repoContainerEl = document.querySelector("#repos-container");
        var allBtn = Array.from(languageButtonsEl.children);

        allBtn.forEach(function (btn) {
          btn.addEventListener("click", buttonClickHandler);
        });
        function buttonClickHandler(event) {
          var language = event.target.getAttribute("data-language");

          if (language === "hitSongs") {
            console.log("hitSongs");
            document.location = hitSongs;
            repoContainerEl.textContent = "";
          }
          if (language === "lyrics") {
            console.log("lyrics");
            document.location = lyrics;
            repoContainerEl.textContent = "";
          }

          languageButtonsEl.addEventListener("click", buttonClickHandler);
        }
      });
    } else {
      alert("Error:" + response.statusText);
    }
  });
};

var searchArtistEl = document.querySelector("#search-input");

var formSubmitHandler = function (event) {
  event.preventDefault();
  var artist = searchArtistEl.value.trim();

  if (artist) {
    getGenius(artist);
    searchArtistEl.value = "";
  } else {
    document.querySelector("#message-container").textContent =
      "Enter something please";
  }
};

document
  .querySelector("#search-form")
  .addEventListener("submit", formSubmitHandler);
