var displayInfo = document.getElementById("display-info");
var searchArtist = document.querySelector("#search-input").value;
var myHeaders = new Headers();

myHeaders.append("X-Api-Key", "YIGqyZy06qmqer7zDr+bcA==vIorM8DFukk00uyM");
// this is the api request for the genius music
var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

var displayEl = document.getElementById("display-content");
var getGenius = function (artistInput) {
  var randNum = Math.floor(Math.random() * 10);
  searchArtist = document.querySelector("#search-input").value;
  var Url = `https://api.genius.com/search?q=${searchArtist}&access_token=brqqAVknBmcQm4VTlCwJYeg72QX_Lbtk7LvoK2OKmd_3Y8PWLN17gkME0t49sTzy`;

  fetch(Url).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        const hits = data.response.hits.filter((hit) =>
          hit.result.artist_names
            .toLowerCase()
            .includes(artistInput.toLowerCase())
        );

        

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
        "Error:" + response.statusText;
    }

   document.querySelector(".fun-fact-btn").classList.remove("hide");
  });
};

// button function for the fun facts and the api call for the fun facts
var funFactsBtn = document.querySelector(".fun-fact-btn");
 funFactsBtn.addEventListener("click", function () {
  var factsUrl = `https://api.api-ninjas.com/v1/celebrity?name=${searchArtist}`;
  fetch(factsUrl, requestOptions).then(function (response) {
    console.log(factsUrl, "facts");

    if (response.ok) {
      response.json().then(function (data) {
        var birthdays = data[0].birthday;
        console.log(birthdays)

        var netWorth = data[0].net_worth;
        console.log(netWorth)

        var nationalitys = data[0].nationality;
        console.log(nationalitys)
        let template = "";
        template += `
       
       
          <p class="artist-birthday">  <span>BIRTHDAY: ${birthdays}</span><p> 
          <p class="artist-net-worth">  <span>  NET WORTH: ${netWorth}</span><p> 
          <p class="artist-nationality">  <span> NATIONALITY: ${nationalitys}</span><p> 
         </div>`;
        displayInfo.innerHTML = template;
      });

     document.querySelector(".fun-fact-btn").classList.add("hide");
    } else {
      document.querySelector("#message-container").textContent =
        "Error:" + response.statusText;
    }
  });
});
// this is the form submit function 
var searchArtistEl = document.querySelector("#search-input");

var formSubmitHandler = function (event) {
  event.preventDefault();
  var artist = searchArtistEl.value.trim();

  if (artist) {
    getGenius(artist);
    searchArtistEl.value = "";
  } else {
  }
};

document
  .querySelector("#search-form")
  .addEventListener("submit", formSubmitHandler);
