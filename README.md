# weather-dashboard
Hello, and welcome to my weather dashboard!
Here you can look up any place and it will return the current weather, as well as a 5-day forecast, for that place!

## how do I use it?
It's simple; you just have to type where you want the weather for into the search bar, and click on the search button (magnifying glass icon) next to it!
The page will dynamically load the weather information, as well as save previous searches and put them below the search bar.

## how was it made?
This weather app was made using HTML, CSS, and Javascript.
All of the CSS is done with Bootstrap, with classes in the HTML.
I use jQuery and moment.js to help vanilla Javascript out a bit, and make things easier for myself.
**$("#div") > document.getElementById("div")**

## yeah but how does it generate weather info?
It simply takes the user's input, then using a geocoding API it makes a guess as to where the user is referring to, and returns a lot of info based on said location, but I just use the latitude and longitude.

That info gets taken out and put into ***another*** fetch request to the OpenWeather OneCall API, where a ***ton*** of weather info can be returned. I then have javascript dynamically adding a ton of elements, changing classes, as well as adding text based on the results taken from the weather API! To explain every little thing would take forever.

### best guess? but I want my place. How come detroit returns this place in "michigan" but not where I am in france?
Yes it can be annoying if you live in less populated places, but with multiple places with the same name, it will take the most popular result and return that. If you aren't getting the result you wish for, please try to be more specific! It does need a ***little*** handholding, sometimes.

## github-pages
https://fiskoal.github.io/weather-dashboard/

## screenshots


