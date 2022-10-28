const iconBlog = document.querySelector('.clound_imgb'),
    date_block = document.querySelector('.date'),
    visibles = document.querySelector('.weatherbcontainer_false'),
    blogfalse = document.querySelector('.blog_false'),
    api = {
        key: "36182ead6c92b3cf6ab00f15bc7b1713",
        basic: 'https://api.openweathermap.org/data/2.5/',
    },
    inputValue = document.querySelector('.inputValue');
    inputValue.addEventListener('keypress', setQuery);
    weathers = {
    temp: null,
    feels_lik: null,
    max_temp: null,
    min_temp: null,
    city: null,
    pressure: null,
    humidity: null,
    wind: null,
    clouds: null,
};
function setQuery(e) {
    if (e.keyCode == 13) {
        input(inputValue.value);
    }
};
function inputBtn() {
    if (inputValue.value != 0) {
        input(inputValue.value);
    }
};
function input(query, inputBtn) {
    fetch(`${api.basic}weather?q=${query || inputBtn}&lang=ru&units=metric&appid=${api.key}`)
        .then(data => {
            return data.json();
        }).then(addWeather);
    inputValue.value = "";
}
function addWeather(data) {
    weathers = {
        temp: data.main.temp,
        feels_lik: data.main.feels_like,
        max_temp: data.main.temp_max,
        min_temp: data.main.temp_min,
        city: data.name,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        clouds: data.weather[0].description,
    };
    checkingСlass();
    currentDate();
    currentIcon();
    outInput();
};
function outInput() {
    document.querySelector('.title').innerHTML = "";
    document.querySelector('.feels').innerHTML = weathers.feels_lik + "°";
    document.querySelector('.cloundText').innerHTML = weathers.clouds;
    let t = Number(weathers.temp);
    document.querySelector('.temp').innerHTML = Math.round(t) + "°";
    document.querySelector('.maxtemp').innerHTML = weathers.max_temp + "°";
    document.querySelector('.mintemp').innerHTML = weathers.min_temp + "°";
    document.querySelector('.city').innerHTML = weathers.city;
    document.querySelector('.temppressure').innerHTML = weathers.pressure;
    document.querySelector('.humidity').innerHTML = weathers.humidity;
    document.querySelector('.wind').innerHTML = weathers.wind;
}
function currentIcon() {
    let w = weathers.clouds;
    const cloundicon = document.getElementById('cloudid');
    cloundicon.classList.add('clound_icon');
    switch (w) {
        case "ясно":
            cloundicon.src = "./images/Cloud/ясно1.png";
            iconBlog.append(cloundicon);
            break;
        case "облачно с прояснениями":
            cloundicon.src = "./images/Cloud/Cloud.png";
            break;
        case "небольшая облачность":
            cloundicon.src = "./images/Cloud/небобл.png";
            break;
        case "переменная облачность":
            cloundicon.src = "./images/Cloud/Cloud.png";
            break;
        case "пасмурно":
            cloundicon.src = "./images/Cloud/пасмурно.png";
            break;
        case "туман":
            cloundicon.src = "./images/Cloud/туман1.png";
            break;
        case "небольшой дождь":
            cloundicon.src = "./images/Cloud/небольшойдождь.png";
            break;
        case "сильный дождь":
            cloundicon.src = "./images/Cloud/сильныйдождь.png";
            break;
        case "дождь":
            cloundicon.src = "./images/Cloud/дождь.png";
            break;
        case "гроза с небольшим дождём":
            cloundicon.src = "./images/Cloud/грозаснебольшимдождём.png";
            break;
    }
}
function currentDate() {
    let now = new Date();
    let optionsDate = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
    }
    date_block.textContent = (now.toLocaleDateString("ru", optionsDate));
}
function checkingСlass() {
    if (blogfalse.classList === "blog_true") {
        blogfalse.classList.add('blog_true');
    } else {
        blogfalse.classList.remove('blog_false');
        blogfalse.classList.add('blog_true');
        visibles.classList.remove('weatherbcontainer_false');
        visibles.classList.add('weatherbcontainer_true');
    };
}