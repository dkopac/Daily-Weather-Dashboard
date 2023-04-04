var apiKey = "4addb47b0367cdd6214ddfcc93ce9834";
var city = "";
var searchCity = $("#search-city");
var searchButton = $("#search-button");
var clearButton = $("clear-history");
var currentCity = $("selected-city");
var currentTemperature = $("temperature");
var currentWindSpeed = $("wind-speed");
var currentHumidity = $("humidity");
var cityEle = $("#city");
function generateHtml(lat, lon, city) {
  console.log(cityEle);
  cityEle.text(city);
}

function getCurrentWeather(city) {
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}
    `
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let obj = data[0];
      let lat = obj.lat;
      let lon = obj.lon;
      generateHtml(lat, lon, city);
      getFiveDayForecast(lat, lon);
      /*$("header h1").html(`
      ${new Date().toDateString()}
      <img src="http://openweathermap.org/img/w/${
        data.weather[0].icon
      }.png"/>`);*/
    });
}
function getFiveDayForecast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}
    `
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      let weekAheadEle = document.querySelector("#week-ahead-container");
      for (let i = 0; i < response.list.length; i = i + 8) {
        var date = new Date(response.list[i].dt * 1000).toLocaleDateString();
        var iconcode = response.list[i].weather[0].icon;
        var iconurl = "http://openweathermap.org/img/wn/" + iconcode + ".png";
        var tempK = response.list[i].main.temp;
        var tempF = ((tempK - 273.5) * 1.8 + 32).toFixed(2);
        var humidity = response.list[i].main.humidity;
        var card = document.createElement("div");
        var cardHeader = document.createElement("h1");
        cardHeader.textContent = response.list[i].dt_txt.substring(0, 10);
        card.append(cardHeader);
        weekAheadEle.append(card);
        console.log(tempF);
        console.log(date);
        $("#fDate" + i).html(date);
        $("#fImg" + i).html("<img src=" + iconurl + ">");
        $("#fTemp" + i).html(tempF + "&#8457");
        $("fHumidity" + i).html(humidity + "%");
      }
    });
}

var citySearchForm = $(".city");
citySearchForm.submit(function (event) {
  event.preventDefault();
  //getFiveDayForecast(city);
  var city = $("#city").val();
  getCurrentWeather(city);
});
