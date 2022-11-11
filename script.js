let weather = {
    apiKey: "2aa8b532b9275f9e9c13107c52c8fd25",

    // fetchHistory function fetches the basic historical data and displays them
    // it calls displayHistory to display the chosen attributes
    fetchHistory: function(city){
        fetch(
            "https://history.openweathermap.org/data/2.5/history/city?q="
            + city
            + "&type=hour&units=imperial&appid="
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayHistory(data))
    },

    // Display historical data
    displayHistory: function(data){
        var unixTime = data.list[0].dt;
        var temperature = data.list[0].main.temp;
        var feel = data.list[0].main.feels_like;
        // var pressure = data.list[0].main.pressure;
        // var humidity = data.list[0].main.humidity;
        var low = data.list[0].main.temp_min;
        var high = data.list[0].main.temp_max;

        let temp = new Date((unixTime) * 1000);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let month = months[temp.getMonth()];
        let date = temp.getDate();
        let time = month + ' ' + date;

        document.querySelector(".hist_time").innerText = "Weather on " + time;
        document.querySelector(".hist_temp").innerText = "Temperature: " + temperature + "°F";
        document.querySelector(".hist_temp_min").innerText = "Low: " + low + "°F";
        document.querySelector(".hist_temp_max").innerText = "High: " + high + "°F";
        document.querySelector(".hist_feels_like").innerText = "Felt like: " + feel + "°F";
    },


    //fetch 7 day data 
    fetch7: function(city){
        fetch(
            
            "https://api.openweathermap.org/data/2.5/forecast/daily?q=" 
            + city 
            + "&cnt=7&units=imperial&appid="
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.display7(data))
    },

    ///fretches 24 hours
    display7: function(data){
        var one = data.list[0].temp.max;
        var two = data.list[1].temp.max;
        var three = data.list[2].temp.max;
        var four = data.list[3].temp.max;
        var five = data.list[4].temp.max;
        var six = data.list[5].temp.max;
        var seven = data.list[6].temp.max;

        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        
        let temp = new Date((data.list[0].dt) * 1000);
        let month = months[temp.getMonth()];
        let date = temp.getDate();
        let time = month + ' ' + date;

        let temp1 = new Date((data.list[1].dt) * 1000);
        let month1 = months[temp1.getMonth()];
        let date1 = temp1.getDate();
        let time1 = month1 + ' ' + date1;

        let temp2 = new Date((data.list[2].dt) * 1000);
        let month2 = months[temp2.getMonth()];
        let date2 = temp2.getDate();
        let time2 = month2 + ' ' + date2;

        let temp3 = new Date((data.list[3].dt) * 1000);
        let month3 = months[temp3.getMonth()];
        let date3 = temp3.getDate();
        let time3 = month3 + ' ' + date3;

        let temp4 = new Date((data.list[4].dt) * 1000);
        let month4 = months[temp4.getMonth()];
        let date4 = temp4.getDate();
        let time4 = month4 + ' ' + date4;

        let temp5 = new Date((data.list[5].dt) * 1000);
        let month5 = months[temp5.getMonth()];
        let date5 = temp5.getDate();
        let time5 = month5 + ' ' + date5;

        let temp6 = new Date((data.list[6].dt) * 1000);
        let month6 = months[temp6.getMonth()];
        let date6 = temp6.getDate();
        let time6 = month6 + ' ' + date6;

        document.querySelector(".one").innerText = time + ": " + one + "°F";
        document.querySelector(".two").innerText = time1 + ": " + two + "°F";
        document.querySelector(".three").innerText = time2 + ": " + three + "°F";
        document.querySelector(".four").innerText = time3 + ": " + four + "°F";
        document.querySelector(".five").innerText = time4 + ": " + five + "°F";
        document.querySelector(".six").innerText = time5 + ": " + six + "°F";
        document.querySelector(".seven").innerText = time6 + ": " + seven + "°F";
    },

    display24: function(data){
        for(let i = 1; i <= data.list.length; i++){
            let temp = data.list[i - 1].main.temp;
            let date = data.list[i - 1].dt;
            var t = new Date(date * 1000);

            document.querySelector(".temp" + i).innerText = t.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'}) + ": " + temp + "°F";
        }
    },

    fetch24: function(city){
        fetch(
            
            "https://pro.openweathermap.org/data/2.5/forecast/hourly?q=" 
            + city 
            + "&units=imperial&cnt=24&appid="
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.display24(data))
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

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png" ;
        document.querySelector(".description").innerText = description;

        document.querySelector(".temp").innerText = temp + " °F";

        document.querySelector(".temp_min").innerText = "Lowest: " + temp_min + " °F";
        document.querySelector(".temp_max").innerText = "Highest: " + temp_max + " °F";
        document.querySelector(".feels_like").innerText = "Feels like: " + feels_like + " °F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + " %";

        document.querySelector(".pressure").innerText = "Pressure: " + pressure + " hpa";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " mph";

        var sunSet = new Date(sunset * 1000).toLocaleTimeString("en-US");
        document.querySelector(".sunset").innerText = "Sunset: " + sunSet;
        var sunRise = new Date(sunrise * 1000).toLocaleTimeString("en-US");
        document.querySelector(".sunrise").innerText = "Sunrise: " + sunRise;

        document.querySelector(".visibility").innerText = "Visibilty: " + visibility + " m";

        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')"
    },

    // this function is used for the "enter" button, type desried city in search bar
    // and press enter, the results will show
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
        this.fetchHistory(document.querySelector(".search-bar").value);
        this.fetch7(document.querySelector(".search-bar").value);
        this.fetch24(document.querySelector(".search-bar").value);
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
});


