//From the weather API
// cloudCoverage = response.data[0].clouds

// if (response.data[0].clouds < 25) {
//     query = sunnySongs[0];
// }
// else if (response.data[0].clouds > 25 && resposne.data[0].clouds < 50) {
//     query = partsunnySongs[0];
// }
// else if (response.data[0].clouds > 50 && response.data[0].clouds < 75) {
//     query = partcloudySongs[0];
// } 
// else {
//     query = cloudySongs[0];
// }

//Song arrays for each type of weather condition:
sunnySongs = ["Walking on Sunshine", "Best Day of My Life", "Once in a While Timeflies", "Juice", "Shut Up and Dance"];
partsunnySongs = ["Peace Train", "Here Comes the Sun Beatles", "Clouds Fin", "Wouldn't it Be Nice", "I Wanna Dance with Somebody"];
partcloudySongs = ["Landslide", "Hey ya!", "Can't Fight this Feeling", "Mr Blue Sky"];
cloudySongs = ["Rainbow", "Cloudy Simon", "Pink Bullets", "A Plain Morning", "Yellow"]
rainySongs = [""];
snowySongs = [""];
stormySongs = [""];

//"One" vs on click prevents multiple instances of music playing over each other
$("#testBtn").one("click", function(e) {
    e.preventDefault();

//Using one song for now until we have the weather API to pull from 
query = sunnySongs[0];

console.log(query);

const settings = {
        "async": true,
            "crossDomain": true,
            "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + query,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "a92d1921e7msh73d333a3f631533p1bcc10jsn76334283dba9",
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
        songEl.attr("src", response.data[0].preview);
        songEl.attr("type", "audio/mpeg");
        audioEl.prepend(songEl);

        });
});