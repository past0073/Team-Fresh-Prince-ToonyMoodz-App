$("#btn").on("click", function(e) {
    e.preventDefault();
query = $("#songInput").val().trim();
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

        //First search result
        var newEl = $("<source>");
        newEl.attr("src", response.data[0].preview);
        newEl.attr("type", "audio/mpeg");
        $("#song").prepend(newEl);

        //Second search result
        var newEl = $("<source>");
        newEl.attr("src", response.data[1].preview);
        newEl.attr("type", "audio/mpeg");
        $("#song").prepend(newEl);
   
        //Third search result
        var newEl = $("<source>");
        newEl.attr("src", response.data[2].preview);
        newEl.attr("type", "audio/mpeg");
        $("#song").prepend(newEl);
             
        //Fourth search result
        var newEl = $("<source>");
        newEl.attr("src", response.data[2].preview);
        newEl.attr("type", "audio/mpeg");
        $("#song").prepend(newEl);

        //Fifth search result
        var newEl = $("<source>");
        newEl.attr("src", response.data[2].preview);
        newEl.attr("type", "audio/mpeg");
        $("#song").prepend(newEl);

        });
});