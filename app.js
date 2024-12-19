const apiKey = '85d148f26f9cd9957495dfad260d6aac';
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherResult = document.getElementById('weatherResult');
const loadingSpinner = document.getElementById('loadingSpinner');


function handleWeatherSearch () {
  const city = cityInput.value;
  if (city) {
      showLoading();
      getWeather(city);
  } else {
      weatherResult.innerHTML = '<p>لطفاً نام شهر را وارد کنید!</p>';
  }
};


searchButton.addEventListener('click', handleWeatherSearch);


cityInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
      handleWeatherSearch();
  }
});


function showLoading () {
  loadingSpinner.style.display = 'block';
}


function hideLoading () {
  loadingSpinner.style.display = 'none';
}



async function getWeather (city) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fa`);
      if (!response.ok) {
        throw new Error('شهر پیدا نشد');
      }
      const data = await response.json();
      displayWeather(data);
    } catch (error) {
      weatherResult.innerHTML = `<p>${error.message}</p>`;
    } finally {
      hideLoading();
      }
};
  

function displayWeather(data) {

  const { name, main, weather } = data;
  const cityName = document.getElementById('cityName');
  const temperature = document.getElementById('temperature');
  const weatherStatus = document.getElementById('weatherStatus');


  cityName.textContent = name;
  temperature.textContent = `دمای هوا: ${main.temp}°C | رطوبت: ${main.humidity}%`;
  weatherStatus.textContent = `وضعیت: ${weather[0].description}`;
}