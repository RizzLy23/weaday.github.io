function getDayName(dateString) {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var date = new Date(dateString);
  return days[date.getDay()];
}

let weather = {
    apiKey: "670a5a75c62f443e711f0d34f2e18bf8",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => {
            const { lon, lat } = data.coord;
          this.displayCurrentWeather(data);
          this.fetchUVIndex(lon, lat);
          this.fetchForecastWeather(city);
        });
    },
    //API cari UVI
    fetchUVIndex: function (lon, lat) {
        fetch(
          `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
        )
          .then((response) => {
            if (!response.ok) {
              alert("Failed to fetch UV index.");
              throw new Error("Failed to fetch UV index.");
            }
            return response.json();
          })
          .then((data) => {
            this.displayUVIndex(data);
            
          });
      },
      //API mencari data 5 hari kedepan output dalam 3 jam
      fetchForecast: function (lon, lat) {
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
        )
          .then((response) => {
            if (!response.ok) {
              alert("Failed to fetch forecast data.");
              throw new Error("Failed to fetch forecast data.");
            }
            return response.json();
          })
          .then((data) => {
            this.showEventDayWeather(data);
          });
    },      

displayCurrentWeather: function (data) {

  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity, pressure } = data.main;
  const { speed } = data.wind;
      
  document.getElementById("city").innerText = name;
  document.getElementById("temp").innerText = temp + "°C";
  document.getElementById("humidity").innerText = humidity + "%";
      
  document.getElementById("wind").innerText = speed + " km/h";
  document.getElementById("description").innerText = description;
  document.getElementById("pressure").innerText = pressure + "mb";
      
  if (temp > 32) {
    document.getElementById("weather-condition").innerText = "Cuaca sangat panas";
  } else if (temp < 20) {
    document.getElementById("weather-condition").innerText = "Cuaca dingin";
  } else {
    document.getElementById("weather-condition").innerText = "Cuaca normal";
  }

  //recomendations umbrella
  if(description.includes("rain") || description.includes("rainfall")){
    document.getElementById("umbrella").innerText = "Need";
  }else{
    document.getElementById("umbrella").innerText = "No need"
  }

  //rekomendasi outdoor
  if(description.includes("rain") || description.includes("rainfall")){
    document.getElementById("outdoor").innerText = "Not enough";
  }else if(description.includes("clear")){
    document.getElementById("outdoor").innerText = "More";
  }else if(description.includes("clouds")){
    document.getElementById("outdoor").innerText = "Enough";
  }else{
    ocument.getElementById("outdoor").innerText = "Not enough";
  }
  //rekomendasi clothes
  if(description.includes("rain") || description.includes("rainfall")){
    document.getElementById("clothes").innerText = "waterproof";
  }else if(description.includes("clear")){
    document.getElementById("clothes").innerText = "Short";
  }else if(description.includes("snow")){
    document.getElementById("clothes").innerText = "Coat & waterproof";
  }else{
    document.getElementById("clothes").innerText = "Long";
  }
},

    //uv kondisi
    displayUVIndex: function (data) {
        const uvIndex = data.value;
        
        //document.getElementById("uvdata").innerText = uvIndex;
        //document.getElementById("uvdata").textContent = uvIndex;
        //document.getElementById("uvvalue").innerText = uvIndex;

        //let uvCategory;
        if (uvIndex >= 0 && uvIndex <= 2) {
            document.getElementById("uvindex").innerText = "Low";
        } else if (uvIndex >= 3 && uvIndex <= 5) {
            document.getElementById("uvindex").innerText = "Medium";
        } else if (uvIndex >= 6 && uvIndex <= 7) {
            document.getElementById("uvindex").innerText = "Hight";
        } else if (uvIndex >= 8 && uvIndex <= 10) {
            document.getElementById("uvindex").innerText = "Very high";
        } else if (uvIndex >= 11) {
            document.getElementById("uvindex").innerText = "Extreme";
        }
      },

    fetchForecastWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("Tidak ada informasi cuaca.");
            throw new Error("Tidak ada informasi cuaca.");
          }
          return response.json();
        })
        .then((data) => this.displayForecastWeather(data));
    },
    /*data cuaca 5 hari kedepan*/
    displayForecastWeather: function (data) {
      const forecastContainer = document.getElementById("forecast-container");
      forecastContainer.innerHTML = "";
  
      const options = { weekday: "short", day: "numeric", month: "long", year: "numeric" };
  
      for (let i = 0; i < data.list.length; i += 8) {
        const { dt_txt, main, weather } = data.list[i];
        const date = new Date(dt_txt);
  
        const forecastCard = document.createElement("div");
        forecastCard.className = "flex flex-row w-[280px] h-[80px] bg-[#ffffff] rounded-lg gap-x-[10px] items-center p-[16px] mt-[16px]";
  
        const weatherIcon = document.createElement("img");
        weatherIcon.className = "w-[52px]";
        weatherIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
        forecastCard.appendChild(weatherIcon);
  
        const weatherInfo = document.createElement("div");
        weatherInfo.className = "weather-info";
  
        const dateElement = document.createElement("h2");
        dateElement.innerText = date.toLocaleDateString("en-US", options);
        weatherInfo.appendChild(dateElement);
  
        const weatherDescription = document.createElement("p");
        weatherDescription.className = "weather-description";
        weatherDescription.innerText = weather[0].description;
        weatherInfo.appendChild(weatherDescription);
  
        forecastCard.appendChild(weatherInfo);
  
        forecastContainer.appendChild(forecastCard);
      }
    },
    search: function () {
      const city = document.getElementById("InputSearchCountry").value;
      this.fetchWeather(city);

      sessionStorage.setItem('city', city);
    },
  };
  
  document.getElementById("InputSearchCountry").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });