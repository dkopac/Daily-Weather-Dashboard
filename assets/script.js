var apiKey = "4addb47b0367cdd6214ddfcc93ce9834";
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
}

var citySearchForm = $(".city");
citySearchForm.submit(function (event) {
  event.preventDefault();
  var city = $("#city").val();
  getCurrentWeather(city);
});
