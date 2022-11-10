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
        document.querySelector("#message-container").textContent =
      "Enter something please";
    //   alert("Error:" + response.statusText);
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
