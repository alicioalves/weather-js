let apiKey = '907599ab4cc1774000b6648eddea3698';
let lang = 'pt_br';
let units = 'metric';

function searchCity(searchTerm){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&lang=${lang}&units=${units}`).then(result => {
            if(result.ok && (isNaN(searchTerm))){
                return result.json(); 
            } else {
                alert("Ocorreu um erro. Confira se informou uma cidada válida");
            }
            
        }) .then (result => {
            init(result);
        })
}

function init(resultFromServer){
    switch(resultFromServer.weather[0].main){
        case 'Clear':
            document.body.style.backgroundImage = 'url("./images/clear.jpg")';
            break;

        case 'Clouds':
            document.body.style.backgroundImage = 'url("./images/cloudy.jpg")';
            console.log(resultFromServer);
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("./images/rain.jpg")';
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("./images/thunderstorm.jpg")';
            break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("./images/snow.jpg")';
            break;

        default:

            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperature = document.getElementById('temperature');
    let humidity = document.getElementById('humidity');
    let windSpeed = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('weatherIcon');

    weatherIcon.src = `http://openweathermap.org/img/wn/${resultFromServer.weather[0].icon}.png`;

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    
    temperature.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    windSpeed.innerHTML = `Vento: ${Math.floor(resultFromServer.wind.speed)}m/s`;
    cityHeader.innerHTML = resultFromServer.name;
    humidity.innerHTML = `Umidade: ${resultFromServer.main.humidity}%`;

    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo (){
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';
}



document.getElementById("searchBtn").addEventListener("click", () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
    searchCity(searchTerm);
})

