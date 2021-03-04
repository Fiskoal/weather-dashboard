$("#submitButton").on("click", function(event) {
  event.preventDefault;
  let city = $("#cityInput").val();

  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=f5b805d426297d41cd234da7c7743bff")
    .then(
      function(response) {
        if (response.status !== 200)  {
          console.log("Oops! Status Code" + response.status);
          return
        }
        response.json().then(function(data){
          console.log(data);
          return drawCurrentForecast(data)
        });
      }
    )
    .catch(function(err) {
      console.log("Fetch Error:" + err);
    });
});

let drawCurrentForecast = function drawCurrentForecast(data){
  console.log(data);
}

/*
API Key:
f5b805d426297d41cd234da7c7743bff

Current Weather API: https://openweathermap.org/current

Forecast API: https://openweathermap.org/forecast5

MDN Fetch Docs: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

Note that this is a personal key, and that for future public deployment I must use a method to generate public, non-personal keys.
*/  