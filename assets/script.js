let stored = JSON.parse(localStorage.getItem("cities"));
let cityArray = stored;

$("#submitButton").on("click", function (event) {

  $("#city").text("");
  $("#currentTemp").text("");
  $("#currentHumidity").text("");
  $("#currentWind").text("");
  $("#currentUV").text("");
  $("#currentUVBadge").text("");


  let city = $("#cityInput").val();

  fetch("https://api.opencagedata.com/geocode/v1/json?q=" + city + "&key=fb50173e34c341a88957c0a94c3f2032&pretty=1")
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log("Oops! Status Code" + response.status);
          return
        }
        response.json().then(function (data) {
          console.log(data);

          $("#city").text(data.results[0].formatted)

          fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data.results[0].bounds.northeast.lat + "&lon=" + data.results[0].bounds.northeast.lng + "&units=imperial&appid=f5b805d426297d41cd234da7c7743bff")
            .then(
              function (response) {
                if (response.status !== 200) {
                  console.log("Oops! Status Code" + response.status);
                  return
                }
                response.json().then(function (data) {
                  console.log(data);
                  return drawCurrentForecast(data)
                });
              }
            )
            .catch(function (err) {
              console.log("Fetch Error:" + err);
            });
        });
      }
    )
    .catch(function (err) {
      console.log("Fetch Error:" + err);
    })


});

let drawCurrentForecast = function drawCurrentForecast(data) {
  console.log(data);

  let img = $("#currentIcon");
  let iconUrl = "https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png";

  // HEADER
  $("#currentForecast").addClass("border rounded");
  img.attr("src", iconUrl);

  // BODY
  $("#currentTemp").text("Temp: " + data.current.temp + "°F");
  $("#currentHumidity").text("Humidity: " + data.current.humidity + "%");
  $("#currentWind").text("Wind Speed: " + data.current.wind_speed + " MPH");
  $("#currentUV").text("UV Index: ");
  $("#currentUVBadge").text(data.current.uvi)

  if (parseInt(data.current.uvi) < 4) {
    $("#currentUVBadge").addClass("badge-success")
  } else if (parseInt(data.current.uvi) > 7) {
    $("#currentUVBadge").addClass("badge-danger")
  } else {
    $("#currentUVBadge").addClass("badge-warning")
  }

  // getting date WITHOUT an API :o
  // (because I wanted to know how it's done, I'm leaving it in for future reference just in case?)
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;

  $("#city").append(" (" + today + ")");

  // back to using moment, until i learn a different (better, non-deprecated) time/date api :)

  let f = 1;
  let day = moment().add(f, "d").format("MM / DD / YYYY")
  console.log(day);

  // 5-day forecast
  $("#fiveDayForecast").text("5-Day Forecast:");

  $("div").each(function () {
    if ($(this).hasClass("setBgPrimary")) {
      $(this).addClass("bg-primary mr-2");
      console.log(day);
      $("#forecastDate" + f).text(day);
      $("#forecastIcon" + f).attr("src", "https://openweathermap.org/img/w/" + data.daily[f].weather[0].icon + ".png")
      $("#temp" + f).text("Temp: " + data.daily[f].temp.day + "°F");
      $("#humidity" + f).text("Humidity: " + data.daily[f].humidity + "%");
      f++;
      day = moment().add(f, "d").format("MM / DD / YYYY");
    };
  })
}

//localstorage


$("#submitButton").on("click", function () {
  let cityName = $("#cityInput").val().trim();

  if (!cityName) {
    return console.log("EMPTY yeet")
  }

  console.log(cityName);
  const pastSearches = JSON.parse(localStorage.getItem("pastSearches")) || [];
  pastSearches.push(cityName);
  localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
  console.log(pastSearches.length);

  return drawPastSearches(pastSearches)
})

let drawPastSearches = function (pastSearches) {
  let createDiv = document.createElement("div");
  console.log(pastSearches.length);
  $("#previousSearches").empty();
  for (i=0; i<pastSearches.length; i++) {
    $("#previousSearches").append($("<button></button>").text(pastSearches[i]).attr("id", "previousButton" + i).addClass("previousButton btn btn-outline-dark mt-2"));
  }
  $(".previousButton").each(function () {
    $(this).on("click", function () {
      console.log("previousButton clicked!");
      console.log($(this).text());
      $("#cityInput").val($(this).text());
    })
  })
}

const previousButtonClass = $(".previousButton")



function init () {
  const pastSearches = JSON.parse(localStorage.getItem("pastSearches")) || []; 
  if (JSON.parse(localStorage.getItem("pastSearches"))) {
    drawPastSearches(pastSearches);
  }
}

init();

/*
API Key:
f5b805d426297d41cd234da7c7743bff

Current Weather API: https://openweathermap.org/current

Forecast API: https://openweathermap.org/forecast5

MDN Fetch Docs: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

Note that this is a personal key, and that for future public deployment I must use a method to generate public, non-personal keys.
*/