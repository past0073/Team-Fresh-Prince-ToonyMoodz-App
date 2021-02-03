
// setting up the search icon button
$(".search-icon").on("click", function(e) {
    e.preventDefault(); 

    // takes the value of user input and stores it in a value called city
    var city = $(".search-bar").val().trim();
    // if there's anything in the display, clear it
    $("#weather-display").empty();

    // setting up some stuff for our ajax call

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.weatherbit.io/v2.0/current?city=" + city + "&units=I&include=minutely&key=435d03693b574180abf7739fb16f6d8f",
        "method": "GET",
      
    };
   
    // ajax call here with settings paramaters
    $.ajax(settings).done(function (response) {
        
        // debugging
        console.log(response);
        console.log(response.data[0].temp);

        // Gets just the city name (data comes in from google as "CITY, STATE, COUNTRY")
        var cityName = city.substr(0, city.indexOf(','));
        // Gives some classes to the city, including animation
        var cityHeader = $("<h2>").text(cityName).addClass("city-header animate__animated animate__fadeInLeft");
        
        // starting to populate the weather display div
        $("#weather-display").append(cityHeader).addClass("animate__animated animate__fadeInLeft");

        // setting up some details for the weather icon
        var icon = "https://www.weatherbit.io/static/img/icons/" + response.data[0].weather.icon + ".png";
        var newIcon = $("<img>");
        newIcon.attr({
            src: icon,
            class: "icon animate__animated animate__fadeInLeft"});

        // putting it in the weather div
        $("#weather-display").append(newIcon);


        // an array of weather data to loop through, add some classes and animation, and add it to the page.
        // index 0 is description, index 1 is Temp, index 2 is humidity, index 3 is wind speed 
        var weatherData = [response.data[0].weather.description, "Temperature: " + Math.floor(response.data[0].temp) + " °F", "Humidity: " + response.data[0].rh + "%", "Wind: " + response.data[0].wind_spd + " MPH"];
        for (i = 0; i < weatherData.length; i++) {
            var newWeatherItem = $("<p>");
            newWeatherItem.text(weatherData[i]);
            newWeatherItem.attr("class", "animate__animated animate__fadeInLeft");
            $("#weather-display").append(newWeatherItem);
        }

        //Song arrays for each type of weather condition:
        sunnySongs = ["3166724", "1175777", "75711295", "666286232", "90326361", "1094034052", "144469614", "828216172", "1040347", "116348464", "1106540662", "3091978"];
        cloudySongs = ["482643502", "2607674","3599559", "9956008", "65707299", "581533", "1101367912", "121876594", "75623960", "637766082", "3128096"]
        rainySongs = ["6069361", "1169683", "2794654", "705016142"];
        snowySongs = ["3659065", "111624866", "75624084", "576178942"];
        stormySongs = ["65445466", "1205382872", "92720102"];
        mistySongs = ["1067282122"];
        sandySongs = ["88954303"];
        smokySongs = ["14619515"];
        hazySongs = ["4952885"];
        foggySongs = ["1204958922"];

        // setting up conditions for which songs to assign given certain weather conditions. The weather codes work nicely for this because they are organized numerically
        weatherCode = response.data[0].weather.code
        
        if (weatherCode > 199 && weatherCode < 234) {
            query = stormySongs[Math.floor(Math.random()*stormySongs.length)];
        }
        else if (weatherCode > 299 && weatherCode < 523) {
            query = rainySongs[Math.floor(Math.random()*rainySongs.length)];
        }
        else if (weatherCode > 599 && weatherCode < 624) {
            query = snowySongs[Math.floor(Math.random()*snowySongs.length)];
        } 
        else if (weatherCode > 699 && weatherCode < 701) {
            query = mistySongs[Math.floor(Math.random()*mistySongs.length)];
        } 
        else if (weatherCode > 730 && weatherCode < 732) {
            query = sandySongs[Math.floor(Math.random()*sandySongs.length)];
        } 
        else if (weatherCode > 710 && weatherCode < 712) {
            query = smokySongs[Math.floor(Math.random()*smokySongs.length)];
        } 
        else if (weatherCode > 720 && weatherCode < 722) {
            query = hazySongs[Math.floor(Math.random()*hazySongs.length)];
        } 
        else if (weatherCode > 740 && weatherCode < 742) {
            query = foggySongs[Math.floor(Math.random()*foggySongs.length)];
        } 
        else if (weatherCode > 799 && weatherCode < 803) {
            query = sunnySongs[Math.floor(Math.random()*sunnySongs.length)];
        } 
        else {
            query = cloudySongs[Math.floor(Math.random()*cloudySongs.length)];
        }

        runDeezerAPI();
    }).fail(function(){
        alert("City must be formatted as CITY, STATE, COUNTRY");
        location.reload();
      });;
});

// Setting up the music end of the app through Deezer
function runDeezerAPI() {
    // if there's anything in that div, remove it
    $("#music-display").empty();

    // paramaters for deezer Ajax call
    const settings = {
        "async": true,
            "crossDomain": true,
            "url": "https://deezerdevs-deezer.p.rapidapi.com/track/" + query,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "a0e59e21b7msh772fee618ca96dap11d7bfjsn2332dc0de1b2",
		        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
            }
        }
    
    // pulling in the Deezer API now with an ajax call
    $.ajax(settings).done(function (response) {

        //debug
        console.log(response);      

        //Append song title
        titleEl = $("<p>");
        titleEl.attr("class", "song-title animate__animated animate__fadeInRight")
        // titleEl.html("Track title: " + response.title);
        titleEl.html(response.title);
        
        $("#music-display").append(titleEl);
      
        //Append artist
        artistEl = $("<p>");
        artistEl.attr("class", "song-artist animate__animated animate__fadeInRight");
        // artistEl.html("Artist: " + response.artist.name);
        artistEl.html(response.artist.name);
        $("#music-display").append(artistEl);

        //Append album art
        albumEl = $("<img>");
        albumEl.attr("class", "song-art animate__animated animate__fadeInRight");
        albumEl.attr("src", response.album.cover_medium);
        $("#music-display").prepend(albumEl);

        //Create an audio div with controls to append song information to
        audioEl = $("<audio>");
        audioEl.attr("class", "song-controller animate__animated animate__fadeInRight");
        audioEl.attr("id", "song");
        //Song automatically plays on load
        audioEl.attr("autoplay", true);
        audioEl.attr("controls", true);
        //If browser allows, reduce volume
        audioEl.attr("volume", 0.1);
        $("#music-display").append(audioEl);

        //Append song to audio player div
        var songEl = $("<source>");
        songEl.attr("src", response.preview);
        songEl.attr("type", "audio/mpeg");
        audioEl.prepend(songEl);
        });
};

// This function pulls in the Google Maps places library, specifically to autocomplete a city when a user starts typing input.

function auto(){

    // Get the city from that search div
    const input = document.getElementById("pac-input");
    // Paramters for places auto complete. Limit to just cities in the United States
    const options = {
      types: ['(cities)'],
      componentRestrictions: { country: "us" }
    };

    // Pull in the autocomplete with arguments of input and options
    new google.maps.places.Autocomplete(input, options);
}

// Bring in the autocomplete as soon as the page loads
google.maps.event.addDomListener(window, 'load', auto);