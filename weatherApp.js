const findWeatherInfo = () => {
  const cityFinder = document.querySelector(".findCity");
  const weatherCondition = document.querySelector(".findWeather");
  const weatherHumidity = document.getElementById("humidity");
  const weatherDeg = document.getElementById("headerDeg");
  const weatherDegFeeling = document.getElementById("deg");

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const geoDegApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6347faa9d420b6391c741fe541c57d46`;



    const fetchStatus = () => {
      fetch(geoDegApiUrl)
        .then((res) => res.json())
        .then((data) => {
          cityFinder.textContent = `${data.name}`;
          weatherCondition.textContent = data.weather[0].description;
          weatherHumidity.textContent = data.main.humidity + "%";
          weatherDeg.textContent = `${(data.main.temp - 273).toFixed(2)}\u00B0C`;
          weatherDegFeeling.textContent = `${(data.main.feels_like - 274).toFixed(2)}\u00B0C`;
        }).catch(err => "api not correct");//PO 
    };



    fetchStatus();

    setInterval(fetchStatus, 30000);
  };

  const error = () => {
    cityFinder.textContent = "give premission";
  };

  navigator.geolocation.getCurrentPosition(success, error);
};

findWeatherInfo();