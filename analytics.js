function changeBackground(condition, isDay) {
  // Logika untuk mengubah latar belakang sesuai kondisi
  // ...

  // Contoh implementasi:
  if (isDay) {
    document.body.style.backgroundColor = "";
  } else {
    document.body.style.backgroundColor = "";
  }
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
        this.fetchForecast(lon, lat);
        this.fetchForecastWeather(city);
        this.imageCondition(data);
        //this.displayForecastWeather(data);
      });
  },

  // API cari UVI
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

  // API mencari data 5 hari kedepan output dalam 3 jam
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
        //this.showEventList(data);
        this.showEventAnalyticWeather(data);

      });

    },
    

    imageCondition: function (data) {
      const condition = data.weather[0].main.toLowerCase();
      const currentTime = new Date().getHours();
      const isDay = currentTime >= 6 && currentTime < 18;

      changeBackground(condition, isDay);
      //changeDescription(condition, isDay);

      const iconElement = document.getElementById("icon");
      let backgroundImage = "";

      //const desc = document.getElementById("description");
      //let descColor = "";
    
      // Menentukan gambar latar belakang berdasarkan kondisi cuaca dan waktu
      if (isDay) {
        if (condition.includes("clear")) {
          backgroundImage = "url('image/day.jpeg')";
        } else if (condition.includes("cloud")) {
          backgroundImage = "url('image/day.jpeg')";
        } else if (condition.includes("rain")) {
          backgroundImage = "url('image/rain.jpeg')";
        } else if (condition.includes("snow")) {
          backgroundImage = "url('image/snow.jpeg')";
        } else {
          backgroundImage = "url('/assets/img1.svg')";
        }
      } else {
        if (condition.includes("clear")) {
          backgroundImage = "url('image/night.jpeg')";
          document.getElementById("description").className = "text-base font-semibold text-neutral-50";
        } else if (condition.includes("cloud")) {
          backgroundImage = "url('image/night.jpeg')";
          document.getElementById("description").className = "text-base font-semibold text-neutral-50";
        } else if (condition.includes("rain")) {
          backgroundImage = "url('image/rain.jpeg')";
          document.getElementById("description").className = "text-base font-semibold text-neutral-50";
        } else if (condition.includes("snow")) {
          backgroundImage = "url('image/snow.jpeg')";
          document.getElementById("description").className = "text-base font-semibold text-neutral-50";
        } else {
          backgroundImage = "url('/assets/img1.svg')";
          document.getElementById("description").className = "text-base font-semibold text-neutral-50";
        }
      }
    
      // Mengubah gambar latar belakang
      iconElement.style.backgroundImage = backgroundImage;
    },

    /*
    descCondition: function (data) {
      const condition = data.weather[0].main.toLowerCase();
      const currentTime = new Date().getHours();
      const isDay = currentTime >= 6 && currentTime < 18;

      changeBackground(condition, isDay);
    
      const iconElement = document.getElementById("icon");
      let backgroundImage = "";
    
      // Menentukan gambar latar belakang berdasarkan kondisi cuaca dan waktu
      if (isDay) {
        if (condition.includes("clear")) {
          backgroundImage = "url('image/day.jpeg')";
        } else if (condition.includes("cloud")) {
          backgroundImage = "url('image/day.jpeg')";
        } else if (condition.includes("rain")) {
          backgroundImage = "url('image/rain.jpeg')";
        } else if (condition.includes("snow")) {
          backgroundImage = "url('image/snow.jpeg')";
        } else {
          backgroundImage = "url('/assets/img1.svg')";
        }
      } else {
        if (condition.includes("clear")) {
          backgroundImage = "url('image/night.jpeg')";
        } else if (condition.includes("cloud")) {
          backgroundImage = "url('image/night.jpeg')";
        } else if (condition.includes("rain")) {
          backgroundImage = "url('image/rain.jpeg')";
        } else if (condition.includes("snow")) {
          backgroundImage = "url('image/snow.jpeg')";
        } else {
          backgroundImage = "url('/assets/img1.svg')";
        }
      }
    
      // Mengubah gambar latar belakang
      iconElement.style.backgroundImage = backgroundImage;
    },
    */
      /* showEventList: function (data){
      const weatherData1 = data.list[0];
        const temperature1 = weatherData1.main.temp;
        const humidity1 = weatherData1.main.humidity;
        const weatherDescription1 = weatherData1.weather[0].description;

        // Update elemen HTML dengan data cuaca pertama
        document.getElementById("temp03").textContent = `${temperature1}`;
    },*/

    displayCurrentWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity, pressure} = data.main;
        const { speed } = data.wind;

        document.getElementById("city").innerText = name;   
        document.getElementById("temp").innerText = temp + "°C";
        document.getElementById("humidity").innerText = humidity + "%";  
        document.getElementById("wind").innerText = speed + " km/h";
        document.getElementById("description").innerText = description;
        document.getElementById("pressure").innerText = pressure + "mb";

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
      document.getElementById("outdoor").innerText = "Not enough";
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

    //rekomendasi suhu headstroke
    if (temp > 41) {
      document.getElementById("heatstroke").innerText = "Extreme Danger";
      document.getElementById("recommendations").innerText = "- Cari tempat yang teduh seperti pusat perbelanjaan, café, atau perpustakaan untuk menghindari panas yang berlebihan. \n- Hindari aktivitas di luar ruangan jika memungkinkan.";
    } else if (temp < 32) {
      document.getElementById("heatstroke").innerText = "High Danger";
      document.getElementById("recommendations").innerText = "- Hindari aktitivas dengan intensitas tinggi diluar ruangan.";
    } else if (temp < 27) {
      document.getElementById("heatstroke").innerText = "Medium Danger";
      document.getElementById("recommendations").innerText = "- Kenakan pakaian yang nyaman dan berbahan menyerap keringat.\n- Gunakan topi atau payung untuk melindungi diri dari sinar matahari langsung.";
    } else {
      document.getElementById("heatstroke").innerText = "Low Danger";
      document.getElementById("recommendations").innerText = "- Tetap terhidrasi dengan cukup minum air.\n- Hindari terlalu lama berada di bawah sinar matahari secara langsung.";
    }

    //rekomendasi suhu windchill
    if (temp <= -25) {
      document.getElementById("windchill").innerText = "Extreme Danger";
      document.getElementById("recommendations").innerText = "- Jaga diri Anda tetap hangat dengan mengenakan lapisan pakaian yang tebal dan tahan angin.\n- Hindari aktivitas di luar ruangan jika memungkinkan.";
    } else if (temp <= -15) {
      document.getElementById("windchill").innerText = "High Danger";
      document.getElementById("recommendations").innerText = "- Kenakan pakaian hangat seperti jaket tebal, sarung tangan, dan topi.\n- Tutupi bagian tubuh yang rentan terhadap angin, seperti wajah dan telinga.";
    } else if (temp <= -5) {
      document.getElementById("windchill").innerText = "Medium Danger";
      document.getElementById("recommendations").innerText = "- Nikmati aktivitas musim dingin seperti bermain ski, snowboarding, atau membangun boneka salju.";
    } else {
      document.getElementById("windchill").innerText = "Low Danger";

    }

    },

    displayUVIndex: function (data) {
      
        const uvIndex = data.value;
        document.getElementById("uvindex").innerText = uvIndex;
        /*
        document.getElementById("uvindex00").innerText = "0";
        document.getElementById("uvindex03").innerText = uvIndex;
        document.getElementById("uvindex06").innerText = uvIndex-6;
        document.getElementById("uvindex09").innerText = uvIndex-3;
        document.getElementById("uvindex12").innerText = uvIndex;
        document.getElementById("uvindex15").innerText = uvIndex-3;
        document.getElementById("uvindex18").innerText = uvIndex-6;
        document.getElementById("uvindex21").innerText = "0";
        */
    },
    

    //show cuaca per jam
    showEventAnalyticWeather: function (data) {
      const forecastData = data.list;
      
      forecastData.forEach(item => {
        const time = new Date(item.dt * 1000).getUTCHours();
        //const weatherDescription = item.weather[0].description;
        const weatherDescription = item.weather[0].main;
    
        if (time === 0) {
          document.getElementById('description00').textContent = weatherDescription;
        } else if (time === 3) {
          document.getElementById('description03').textContent = weatherDescription;
        } else if (time === 6) {
          document.getElementById('description06').textContent = weatherDescription;
        } else if (time === 9) {
          document.getElementById('description09').textContent = weatherDescription;
        } else if (time === 12) {
          document.getElementById('description12').textContent = weatherDescription;
        } else if (time === 15) {
          document.getElementById('description15').textContent = weatherDescription;
        } else if (time === 18) {
          document.getElementById('description18').textContent = weatherDescription;
        } else if (time === 21) {
          document.getElementById('description21').textContent = weatherDescription;
        }
      });
    },
    //api prediction
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
        forecastCard.className = "flex w-[280px] h-contain bg-[#ffffff] rounded-lg space-x-[8px] items-center px-[16px] py-[12px] mt-[36px]";
  
        const weatherIcon = document.createElement("img");
        weatherIcon.className = "w-[30%]";
        weatherIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
        forecastCard.appendChild(weatherIcon);
  
        const weatherInfo = document.createElement("div");
        weatherInfo.className = "weather-info";
  
        const dateElement = document.createElement("h2");
        dateElement.className = "text-sm";
        dateElement.innerText = date.toLocaleDateString("en-US", options);
        weatherInfo.appendChild(dateElement);
  
        const weatherDescription = document.createElement("p");
        weatherDescription.className = "font-semibold text-sm";
        weatherDescription.innerText = weather[0].description;
        weatherInfo.appendChild(weatherDescription);
  
        forecastCard.appendChild(weatherInfo);
  
        forecastContainer.appendChild(forecastCard);
      }
    },

    search: function () {
        const city = document.getElementById("InputSearchCountry").value;
        this.fetchWeather(city);
      },
    };

    document.getElementById("InputSearchCountry").addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });