$(".search-icon").on("click", function(e) {
    e.preventDefault(); 
    $("#weather-display").empty();
    var city = $(".search-bar").val().trim();
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.weatherbit.io/v2.0/current?city=" + city + "&units=I&include=minutely&key=f9b72c322157431f92010fd9c3d81acd",
        "method": "GET",
    };
    console.log(settings.url);

    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log(response.data[0].temp);
        var icon = "https://www.weatherbit.io/static/img/icons/" + response.data[0].weather.icon + ".png";
        var newIcon = $("<img>");
        newIcon.attr("src", icon);
        $("#weather-display").append(newIcon);

        var weatherData = [response.data[0].weather.description, "Temperature: " + Math.floor(response.data[0].temp) + " °F", "Humidity: " + response.data[0].rh + "%", "Wind: " + response.data[0].wind_spd + " MPH"];
        for (i = 0; i < weatherData.length; i++) {
            var newWeatherItem = $("<p>");
            newWeatherItem.text(weatherData[i]);
            newWeatherItem.attr("class", "weather-item");
            $("#weather-display").append(newWeatherItem);
        }

        //Song arrays for each type of weather condition:
        sunnySongs = ["3166724", "1175777", "75711295", "666286232", "90326361", "1094034052", "828216172", "1040347", "116348464", "1106540662", "3091978"];
        cloudySongs = ["482643502", "2607674","3599559", "9956008", "65707299", "581533", "144469614", "1101367912", "121876594", "75623960", "637766082", "3128096"]
        rainySongs = ["6069361", "1169683", "2794654", "705016142"];
        snowySongs = ["3659065", "111624866", "75624084", "576178942"];
        stormySongs = ["65445466", "1205382872", "92720102"];
        mistySongs = ["1067282122"];
        sandySongs = ["88954303"];
        smokySongs = ["14619515"];
        hazySongs = ["4952885"];
        foggySongs = ["1204958922"];

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
    });
});

function runDeezerAPI() {

    event.preventDefault();
    $("#music-display").empty();

    const settings = {
        "async": true,
            "crossDomain": true,
            "url": "https://deezerdevs-deezer.p.rapidapi.com/track/" + query,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "3a0b24119bmsh146e1af8ec6ab63p1333d4jsn7c3220356a72",
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
            }
        }

    $.ajax(settings).done(function (response) {

        console.log(response);

        //Create an audio div with controls to append song information to
        audioEl = $("<audio>");
        audioEl.attr("id", "song");
        audioEl.attr("autoplay", true);
        audioEl.attr("controls", true);
        audioEl.attr("volume", 0.01);
        $("#music-display").prepend(audioEl);

        //Append song to audio player div
        var songEl = $("<source>");
        songEl.attr("src", response.preview);
        songEl.attr("type", "audio/mpeg");
        audioEl.prepend(songEl);

        //Append song title
        titleEl = $("<p>");
        titleEl.html("Track title: " + response.title);
        $("#music-display").append(titleEl);
      
        //Append artist
        artistEl = $("<p>");
        artistEl.html("Artist: " + response.artist.name);
        $("#music-display").append(artistEl);

        //Append album art
        albumEl = $("<img>");
        albumEl.attr("src", response.album.cover_medium);
        $("#music-display").append(albumEl);
        
        
        var rythm = new Rythm()
        rythm.crossOrigin = "anonymous"
        rythm.setMusic(response.preview)
        rythm.start()
        });
};

