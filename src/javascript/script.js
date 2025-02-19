document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityname = document.querySelector('#city-name').value;

    if(!cityname) {
        document.querySelector("#weather").classList.remove('show');
        showAlert('Você precisa digitar uma cidade...');
        return;
    }

    const apiKey = 'd8140ff7d22eb24e95459f11fb6ca4d4';
    const apiUrL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityname)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const results = await fetch (apiUrL);
    const json = await results.json();

    if (json.cod === 200) {
showInfo({
    city: json.name,
    country: json.sys.country,
    temp: json.main.temp,
    tempMax: json.main.temp_max,
    tempMin: json.main.temp_min,
    description: json.weather[0].description,
    tempIcon: json.weather[0].icon,
    windSpeed: json.wind.speed,
    humidity: json.main.humidity,
})
    } else {
        document.querySelector("#weather").classList.remove('show');
        showAlert(`
            Não foi possível localizar...
            
            <img src="src/images/404.svg"/>
            `)
    }

});

function showInfo(json){
    showAlert('');
    document.querySelector("#weather").classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temp-value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#temp-description').innerHTML = `${json.description}`;
    document.querySelector('#temp-img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('#temp-max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#temp-min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;
}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}