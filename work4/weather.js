const apiKey = 'c36c3d4f715e64907aba33fa659344e5';

// Call weatherApi() on page load to fetch weather data for the default city
window.onload = function() {
    weatherApi();
};

function weatherApi() {
    const cityInput = document.getElementById('cityInput').value || 'New York'; // Set default value to 'Dhaka'
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.log('Error:', error));
}
        function displayWeather(data) {
            const weatherInfoDiv = document.getElementById('weatherInfo');
            weatherInfoDiv.innerHTML = '';

            if (data.cod !== '200') {
                weatherInfoDiv.innerHTML = '<p>Error: Not found</p>';
                return;
            }

            const forecastList = data.list;
            const forecastsFor6AM = forecastList.filter(forecast => {
                const time = new Date(forecast.dt_txt).getHours();
                return time === 6;
            });

            forecastsFor6AM.forEach(forecast => {
                const dateContainer = document.createElement('div');
                dateContainer.classList.add('fetchDate-container');

                const dateTime = new Date(forecast.dt_txt);
                const day = Week(dateTime.getDay());
                const date = dateTime.toLocaleDateString();
                dateContainer.innerHTML += `
                    <h3> ${day}</h3><br>
                    <h4>${date}</h4>
                `;

                const temperature = forecast.main.temp;
                const humidity = forecast.main.humidity;
                const description = forecast.weather[0].description;
                const iconCode = forecast.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

                dateContainer.innerHTML += `
                    <p>Temperature: ${temperature}°C</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Condition: ${description}</p>
                    <img class="weather-icon" src="${iconUrl}" alt="Weather Icon">
                    <hr>
                `;

                weatherInfoDiv.appendChild(dateContainer);
            });
        }

        function Week(dayIndex) {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return days[dayIndex];
        }