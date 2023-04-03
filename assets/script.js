var apiKey = "4addb47b0367cdd6214ddfcc93ce9834";
var city = "";
var searchCity = $("#search-city");
var searchButton = $("#search-button");
var clearButton = $("clear-history");
var currentCity = $("selected-city");
var currentTemperature = $("temperature");
var currentWindSpeed = $("wind-speed");
var currentHumidity = $("humidity");
function getCurrentWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      $("header h1").html(`
      ${new Date().toDateString()}
      <img src="http://openweathermap.org/img/w/${
        data.weather[0].icon
      }.png"/>`);
    });
}
function getFiveDayForecast(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
  var date = new Date(
    response.list[(i + 1) * 8 - 1].dt * 1000
  ).toLocaleDateString();
  var iconcode = response.list[(i + 1) * 8 - 1].weather[0].icon;
  var iconurl = "http://openweathermap.org/img/wn/" + iconcode + ".png";
  var tempK = response.list[(i + 1) * 8 - 1].main.temp;
  var tempF = ((tempK - 273.5) * 1.8 + 32).toFixed(2);
  var humidity = response.list[(i + 1) * 8 - 1].main.humidity;

  $("#fDate" + 1).html(date);
  $("#fImg" + i).html("<img src=" + iconurl + ">");
  $("#fTemp" + i).html(tempF + "&#8457");
  $("fHumidity" + i).html(humidity + "%");
}

var citySearchForm = $(".city");
citySearchForm.submit(function (event) {
  event.preventDefault();
  var city = $("#city").val();
  getCurrentWeather(city);
});
