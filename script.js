let weather = {
    apiKey: "2aa8b532b9275f9e9c13107c52c8fd25",

    // forecastWeather is used to display the 7 day forcast 
    // showAttributeWeather: function(city){
    //     fetch(
    //         "https://api.openweathermap.org/data/2.5/weather?q=" 
    //         + city 
    //         + "&units=imperial&appid="
    //         + this.apiKey
    //     )
    //     .then((response) => response.json())
    //     .then((data) => this.AttributeWeather(data))
    // },
    // AttributeWeather: function(data){
    //     const { name } = data;
    //     const { icon, description } = data.weather[0];
    //     const { temp, humidity } = data.main;
    //     const { speed } = data.wind;
    //     console.log(name, icon, description, temp, humidity, speed);

    //     document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    //     document.querySelector(".wind").innerText = "Wind speed: " + speed + " mph";

    //     document.querySelector("#testA").classList.remove("loading");
    //     // document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')"
    // },

    
    //fetchWeather function fetches the basic weather attibutes and displays them
    //it calls displayWeather function to display the chosen attributes 
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=imperial&appid="
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png" ;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " mph";

        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')"
    },

    // this function is used for the "enter" button, type desried city in search bar
    // and press enter, the results will show
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function (){
        weather.search();
});

//for the enter button on keyboard
document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if(event.key == "Enter"){
        weather.search();
    }
})

// document.querySelector("#testA").addEventListener("click", function (){
//     weather.AttributeWeather();
// });


// document.querySelector(".hover-btn").addEventListener("click", function(){
//     weather.showDiv();
// });
weather.fetchWeather("Dallas");