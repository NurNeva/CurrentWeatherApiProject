const url = "https://api.openweathermap.org/data/2.5";
const apiKey = "05567efc05bf789f88f8a9fe9cedea2b";




const setQuery = (e) => {
    if (e.keyCode == "13") {
        getResult(searchBar.value);
    }
}

const getResult = async (cityName) => {
    let query = `${url}/weather?q=${cityName}&appid=${apiKey}&lang=tr`;
    console.log(query);

    try {
        const response = await fetch(query);
        const data = await response.json();
        displayResult(data);
    } catch (error) {
        console.log("Error fetching data: ", error);
    }
}

const displayResult = (result) => {
    let city = document.querySelector(".city");
    city.innerHTML = `${result.name}, ${result.sys.country}`;

    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round(kelvinToCelsius(result.main.temp))}°C`;

    let desc = document.querySelector(".desc");
    desc.innerHTML = result.weather[0].description;

    let minmax = document.querySelector(".minmax");
    minmax.innerHTML = `${Math.round(kelvinToCelsius(result.main.temp_min))}°C /
    ${Math.round(kelvinToCelsius(result.main.temp_max))}°C`;
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keypress", setQuery);