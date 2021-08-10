// refer to  https://openweathermap.org/api/one-call-api
//Meed moment() for up-to-date, dates and times.
var startDate = moment().format('M/DD/YYYY');  // Current Date
var day1 = moment().add(1, 'days').format('M/DD/YYYY');
var day2 = moment().add(2, 'days').format('M/DD/YYYY');
var day3 = moment().add(3, 'days').format('M/DD/YYYY');
var day4 = moment().add(4, 'days').format('M/DD/YYYY');
var day5 = moment().add(5, 'days').format('M/DD/YYYY');

$(document).ready(function () {
    console.log("ready!");

    // On-click when user enters city
    $("#basic-text1").on("click", function (event) {
        event.preventDefault();
        var cityInput = $("#input").val(); //saves the city that has been entered
        var allCities = []; // Array to hold all searched cities

        allCities = JSON.parse(localStorage.getItem("allCities")) || []; // Get cities
        allCities.push(cityInput); // pushes new cities entered to array
        localStorage.setItem("allCities", JSON.stringify(allCities)); //saves city input to local storage

        showWeather(cityInput);
    }); // End of city button on-click

    function showWeather(cityInput) {

        // empties out previous data so that it only shows selected weather
        $("#dailyWeather").empty();
        $("#fiveDay").empty();
        $("#day1").empty();
        $("#day2").empty();
        $("#day3").empty();
        $("#day4").empty();
        $("#day5").empty();

        // QueryURL to Open Weather App for One Day
        var oneDay = "https://api.openweathermap.org/data/2.5/weather?q="
            + cityInput + "&units=imperial" + "&appid=45e45c0bb2ef540df33fa21a29aafa8a";
        console.log("oneDay", oneDay);

        //AJAX call for One Day
        $.ajax({
            url: oneDay,
            method: "GET",
        }).then(function (response) {

            // Variables lat/longitude
            var iconUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"; //icon url
            var lat = response.coord.lat; 
            var lon = response.coord.lon; 

            // Append daily details to the site
            $("#dailyWeather").append(
                "<div class='col s12 m6'>"
                + "<h2 class='daily'>" + response.name + " (" + startDate + ")" + "&nbsp" + "<img src='" + iconUrl + "'>" + "</h2>"
                + "<ul class='daily'>" + "Temperature: " + response.main.temp + " °F" + "</ul>"
                + "<ul class='daily'>" + "Humidity: " + response.main.humidity + "%" + "</ul>"
                + "<ul class='daily'>" + "Wind Speed: " + response.wind.speed + " MPH" + "</ul>"
                + "</div>"
            ); // End of append

            // QueryURL to Open Weather App
            var fiveDay = "https://api.openweathermap.org/data/2.5/onecall?"
                + "lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=45e45c0bb2ef540df33fa21a29aafa8a";
            console.log("fiveDay", fiveDay);

            //AJAX call for Five Day & UV
            $.ajax({
                url: fiveDay,
                method: "GET",
            }).then(function (response) {

                //icon urls
                var iconUrl1 = "http://openweathermap.org/img/w/" + response.daily[0].weather[0].icon + ".png";
                var iconUrl2 = "http://openweathermap.org/img/w/" + response.daily[1].weather[0].icon + ".png";
                var iconUrl3 = "http://openweathermap.org/img/w/" + response.daily[2].weather[0].icon + ".png";
                var iconUrl4 = "http://openweathermap.org/img/w/" + response.daily[3].weather[0].icon + ".png";
                var iconUrl5 = "http://openweathermap.org/img/w/" + response.daily[4].weather[0].icon + ".png";

                // Adding in UV Index to daily weather
                $("#dailyWeather").append(
                    "<div class='col s12 m6'>"
                    + "<ul class='daily'>" + "UV Index: " + "<button class='w3-button' id='uvIndex' class='daily'>" + response.current.uvi + "</button>" + "</ul>"
                    + "</div>"
                ); // End of append

                // UV Index colors
                if (response.current.uvi <= 2) {
                    $("#uvIndex").addClass("green");
                } else if (response.current.uvi <= 5) {
                    $("#uvIndex").addClass("yellow");
                } else if (response.current.uvi <= 7) {
                    $("#uvIndex").addClass("orange");
                } else if (response.current.uvi <= 10) {
                    $("#uvIndex").addClass("red");
                } else if (response.current.uvi <= 40) {
                    $("#uvIndex").addClass("purple");
                };

                // HEADER
                $("#fiveDay").append(
                    "<div class='col-md-12'>"
                    + "<h2 id='fiveDay'>" + "5-Day Forecast:" + "</h2>"
                ); // End of append

                // DAY ONE DETAILS
                $("#day1").append(
                    "<div class='fiveDayCard card col s12 m6'>"
                    + "<div class='card-body'>"
                    + "<div class='card-header'>" + day1 + "</div>"
                    + "<div class='card-text'>" + "<img src='" + iconUrl1 + "'>" + "</div>"
                    + "<div class='card-text'>" + "Temp: " + response.daily[0].temp.day + " °F" + "</div>"
                    + "<div class='card-text'>" + "Humidity: " + response.daily[0].humidity + "%" + "</div>"
                    + "</div>"
                ); // End of append

                //DAY TWO DETAILS
                $("#day2").append(
                    "<div class='fiveDayCard card col s12 m6'>"
                    + "<div class='card-body'>"
                    + "<div class='card-header'>" + day2 + "</div>"
                    + "<div class='card-text'>" + "<img src='" + iconUrl2 + "'>" + "</div>"
                    + "<div class='card-text'>" + "Temp: " + response.daily[1].temp.day + " °F" + "</div>"
                    + "<div class='card-text'>" + "Humidity: " + response.daily[1].humidity + "%" + "</div>"
                    + "</div>"
                ); // End of append

                //DAY THREE DETAILS
                $("#day3").append(
                    "<div class='fiveDayCard card col s12 m6'>"
                    + "<div class='card-body'>"
                    + "<div class='card-header'>" + day3 + "</div>"
                    + "<div class='card-text'>" + "<img src='" + iconUrl3 + "'>" + "</div>"
                    + "<div class='card-text'>" + "Temp: " + response.daily[2].temp.day + " °F" + "</div>"
                    + "<div class='card-text'>" + "Humidity: " + response.daily[2].humidity + "%" + "</div>"
                    + "</div>"
                ); // End of append

                //DAY FOUR DETAILS
                $("#day4").append(
                    "<div class='fiveDayCard card col s12 m6'>"
                    + "<div class='card-body'>"
                    + "<div class='card-header'>" + day4 + "</div>"
                    + "<div class='card-text'>" + "<img src='" + iconUrl4 + "'>" + "</div>"
                    + "<div class='card-text'>" + "Temp: " + response.daily[3].temp.day + " °F" + "</div>"
                    + "<div class='card-text'>" + "Humidity: " + response.daily[3].humidity + "%" + "</div>"
                    + "</div>"
                ); // End of append

                //DAY FIVE DETAILS
                $("#day5").append(
                    "<div class='fiveDayCard card col s12 m6'>"
                    + "<div class='card-body'>"
                    + "<div class='card-header'>" + day5 + "</div>"
                    + "<div class='card-text'>" + "<img src='" + iconUrl5 + "'>" + "</div>"
                    + "<div class='card-text'>" + "Temp: " + response.daily[4].temp.day + " °F" + "</div>"
                    + "<div class='card-text'>" + "Humidity: " + response.daily[4].humidity + "%" + "</div>"
                    + "</div>"
                ); // End of append

                showCities(); // calls function to append cities
            }) // End of ajax then response
        }) // End of ajax then response
    } // end of show weather function

    //Now we need to create function to retrieve the stored input saved prior

    function showCities () {
        $("#cityButtons").empty(); // empties oout the array
        var arrayFromStorage =JSON.parse(localStorage.getItem("allCities")) || [];
        var arrayLength = arrayFromStorage.length;

        // Need to lop it to pre append the cities in the length of array
        //  /// Make sure to ENd Loop!
        for (var i = 0; i <arrayLength; i++) {
            var cityNameFromArray =arrayFromStorage[i]; 

            $("#cityButtons").append (
                // styling
                "<div class = 'list-group'>"
                // below is for the city
                + "<button class= 'list-group-item'>" + cityNameFromArray
                + "</button>")
        } // loop over
    } // showCities function is over

    // Need to call ShowCities to append the cities to the page.
    showCities (); 

    $("#cityButtons").on("click", ".list-group-item", function(event) {
        event.preventDefault();
        var cityInput = ($(this).text());
        showWeather(cityInput);
    })
}); // $(document).ready(function) closed. g2g