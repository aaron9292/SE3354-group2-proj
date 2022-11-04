let weather = {
    apiKey: "2aa8b532b9275f9e9c13107c52c8fd25",

   

    // fetchHistory function fetches the basic historical data and displays them
    // it calls displayHistory to display the chosen attributes
    fetchHistory: function(city){

        // Geocoding to get Latitude and Longitude from City name
        fetch(
            "http://api.openweathermap.org/geo/1.0/direct?q="
            + city
            + "&appid="
            + this.apiKey
        )
        .then((lat) => lat.json())
        .then((lon) => lon.json()) 
        // Fetch history of location   
        .then(fetch(
            "https://history.openweathermap.org/data/2.5/history/city?lat="
            + lat
            + "&lon="
            + lon
            + "&type=hour&appid="
            + this.apiKey
        ))
        .then((history) => this.displayHistory(history))
    },

    // Display historical data
    displayHistory: function(history){
        const { time } = history.dt;
        const { temp, feels_like, temp_min, temp_max } = history.main;

        document.querySelector(".hist_time").innerText = "Weather at " + this.convertTime(time);
        document.querySelector(".hist_temp").innerText = temp + "°F";
        document.querySelector(".hist_temp_min").innerText = "Lowest: " + temp_min + "°F";
        document.querySelector(".hist_temp_max").innerText = "Highest: " + temp_max + "°F";
        document.querySelector(".hist_feels_like").innerText = "Feels like: " + feels_like + "°F";
    },

    //fetch 24 hour data (needs work)
    fetch24: function(city){ 
        fetch( //retrieves API data
            "https://api.openweathermap.org/data/2.5/forecast?q=" 
            + city 
            + "&units=imperial&appid="
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.display24(data)) //gives data to display24
    },
    display24: function(data){ //will get the relative temp data for multiple hours into the day
        const { temp } = data.list[0].main;

        document.querySelector(".temp").innerText = "Hour 1: " + temp;
    },
    
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
        const { temp, humidity, temp_min, temp_max, pressure, feels_like } = data.main;
        const { speed } = data.wind;
        const { visibility } = data;
        const { sunrise, sunset } = data.sys;
        // console.log(name, icon, description, temp, humidity, speed, visibility);

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png" ;
        document.querySelector(".description").innerText = description;

        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".temp_min").innerText = "Lowest: " + temp_min + "°F";
        document.querySelector(".temp_max").innerText = "Highest: " + temp_max + "°F";
        document.querySelector(".feels_like").innerText = "Feels like: " + feels_like + "°F";

        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".pressure").innerText = "Pressure: " + pressure + " hpa";
        

        riseStamp = new Date(sunrise * 1000);
        // Get hours from the timestamp
        hours = riseStamp.getUTCHours();
        // Get minutes part from the timestamp
        minutes = riseStamp.getUTCMinutes();
        // Get seconds part from the timestamp
        seconds = riseStamp.getUTCSeconds();
        riseformattedTime = hours.toString().padStart(2, '0') + ':' +
                        minutes.toString().padStart(2, '0') + ':' +
                        seconds.toString().padStart(2, '0');
        document.querySelector(".sunrise").textContent = riseformattedTime;
        setStamp = new Date(sunset * 1000);
        // Get hours from the timestamp
        hours = setStamp.getUTCHours();
        // Get minutes part from the timestamp
        minutes = setStamp.getUTCMinutes();
        // Get seconds part from the timestamp
        seconds = setStamp.getUTCSeconds();

        setformattedTime = hours.toString().padStart(2, '0') + ':' +
                        minutes.toString().padStart(2, '0') + ':' +
                        seconds.toString().padStart(2, '0');

        document.querySelector(".sunset").textContent = setformattedTime;

        // this.sunrise = this.convertTime(data);
        // document.querySelector(".sunrise").innerText = "Sunrise: " + sunrise; 
        // document.querySelector(".sunset").innerText = "Sunset: " + sunset ;

        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')"
    },

    // this function is used for the "enter" button, type desried city in search bar
    // and press enter, the results will show
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
        this.fetchHistory(document.querySelector(".search-bar").value);
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


weather.fetchWeather("Dallas");
weather.fetch24("Dallas");
weather.fetchHistory("Dallas");