

$(".search-icon").on("click", function(e) {
    e.preventDefault(); 
    var city = $(".search-bar").val().trim();
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://weatherbit-v1-mashape.p.rapidapi.com/current?city=" + g + "&units=I&include=minutely&key=f9b72c322157431f92010fd9c3d81acd",
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
    });
});