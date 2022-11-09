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

// var getVideo = function () {
//   var videoUrl = ""
//   fetch(videoUrl).then(function (response) {
//     if (response.ok) {
//       response.json().then(function (data) {
//         console.log(data)

//       });
//     } else {
//       alert("Error:" + response.statusText);
//     }
//   });
// };
// getVideo();
var displayEl = document.getElementById("display-content");
var getGenius = function (randNum) {
  var searchArtist = document.querySelector("#search-input").value;
  var Url = `https://api.genius.com/search?q=${searchArtist}&access_token=brqqAVknBmcQm4VTlCwJYeg72QX_Lbtk7LvoK2OKmd_3Y8PWLN17gkME0t49sTzy`;

  fetch(Url).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);



        var lyrics = data.response.hits[randNum].result.url;

        var image = data.response.hits[randNum].result.song_art_image_url;
        // var image = data.response.hits[randNum].result.primary_artist.image_url;

        
        // console.log(image)

        var hitSongs = data.response.hits[0].result.primary_artist.url;

        let templateCurrent = "";

        templateCurrent += `
        <div class="display-contents">
        
        

        <img  class="img-width" src="${image}"/>
          <p>
           <strong>:</strong> ${lyrics}
            <br>
           
            <br>
            <strong>:</strong> ${hitSongs}
          </p>
       
         
        </div>
        `;
        displayEl.innerHTML = templateCurrent;

        var languageButtonsEl = document.querySelector('#language-buttons');
        var repoContainerEl = document.querySelector('#repos-container');
        // var allBtn = Array.from(languageButtonsEl.children);

        //  allBtn.forEach(function(btn){
        //     btn.addEventListener("click", buttonClickHandler )
        // })
        var buttonClickHandler = function (event) {
            var language = event.target.getAttribute('data-language');
          
            if (language==="hitSongs") {
              document.location = hitSongs ;
              repoContainerEl.textContent = '';
            }
            if  (language==="lyrics") {
                document.location = lyrics ;
                 repoContainerEl.textContent = '';
              }
            //   if (language==="hitSongs") {
            //     document.location = video ;
            //      repoContainerEl.textContent = '';
            //   }
              
            languageButtonsEl.addEventListener('click', buttonClickHandler);
            
          };
         
          
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
  console.log(artist, "artist");
  var randomNum = Math.floor(Math.random() * 10)
  getGenius(randomNum);
};

// var repoContainerEl = document.querySelector('#repos-container');
// var buttonClickHandler = function (event) {
//     var language = event.target.getAttribute('data-language');
  
//     if (language) {
//         getGenius(language);
  
//       repoContainerEl.textContent = '';
//     }
//   };

document
  .querySelector("#search-form")
  .addEventListener("submit", formSubmitHandler);
  
