$(".search-icon").on("click", function(e) {
    e.preventDefault(); 
    var city = $(".search-bar").val().trim();
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://weatherbit-v1-mashape.p.rapidapi.com/current?city=" + city + "&units=I&include=minutely&key=f9b72c322157431f92010fd9c3d81acd",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "a92d1921e7msh73d333a3f631533p1bcc10jsn76334283dba9",
            "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com"
        }
    };
    console.log(settings.url);

    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log(response.data[0].temp);
        var icon = "https://www.weatherbit.io/static/img/icons/" + response.data[0].weather.icon + ".png";
        var newIcon = $("<img>");
        newIcon.attr("src", icon);
        $(".title-cnt").append(newIcon);

        //Song arrays for each type of weather condition:
        sunnySongs = ["3166724", "1175777", "75711295", "666286232", "90326361"];
        partsunnySongs = ["1094034052", "828216172", "1040347", "116348464", "1106540662", "3091978"];
        partcloudySongs = ["3599559", "9956008", "65707299", "581533", "144469614"];
        cloudySongs = ["482643502", "2607674", "1101367912", "121876594", "75623960", "637766082", "3128096"]
        rainySongs = ["6069361", "1169683", "2794654", "705016142"];
        snowySongs = ["3659065", "111624866", "75624084", "576178942"];
        stormySongs = ["65445466", "1205382872", "92720102"];

        cloudCoverage = response.data[0].clouds
        console.log(cloudCoverage);
        
        if (response.data[0].clouds < 25) {
            query = sunnySongs[0];
        }
        else if (response.data[0].clouds > 25 && response.data[0].clouds < 50) {
            query = partsunnySongs[0];
        }
        else if (response.data[0].clouds > 50 && response.data[0].clouds < 75) {
            query = partcloudySongs[0];
        } 
        else {
            query = cloudySongs[0];
        }

        runDeezerAPI();
    });
});

function runDeezerAPI() {

    event.preventDefault();
    $("#music-display").empty();
    console.log(query);

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
        $("#music-display").prepend(audioEl);

        //Append song to audio player div
        var songEl = $("<source>");
        songEl.attr("src", response.preview);
        songEl.attr("type", "audio/mpeg");
        audioEl.prepend(songEl);

        });
};