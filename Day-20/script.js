const searchBtn = document.getElementById("searchBtn");
const loader = document.getElementById("loader");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", getWeather);

function getWeather() {

    const city = document.getElementById("cityInput").value;

    if(city === "") {
        alert("Please enter a city name");
        return;
    }

    weatherResult.innerHTML = "";
    loader.classList.remove("hidden");

    const apiKey = "1a2b3c4d5e6f7g8h9i0j";  // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


    fetch(url)
        .then(response => {
            if(!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {

            loader.classList.add("hidden");

            weatherResult.innerHTML = `
                <h3>City: ${data.name}</h3>
                <h3>Temperature: ${data.main.temp} °C</h3>
                <h3>Humidity: ${data.main.humidity} %</h3>
                <h3>Condition: ${data.weather[0].description}</h3>
            `;
        })
        .catch(error => {
            loader.classList.add("hidden");
            weatherResult.innerHTML = `<p>${error.message}</p>`;
        });
}