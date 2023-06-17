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
            //this.fetchForecastWeather(city);
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
  
        //recomendations umbrella
        if(description.includes("rain") || description.includes("rainfall")){
          document.getElementById("umbrella").innerText = "Need";
          document.getElementById("recommendations").innerText = "- Kenakan pakaian yang hangat dan tahan air, seperti jaket, jas hujan, dan sepatu bot hujan, jika Anda harus keluar rumah.";
          
        }else{
          document.getElementById("umbrella").innerText = "No need";
          document.getElementById("recommendations").innerText = "- Pakailah pakaian yang nyaman, seperti kaos berlengan pendek, celana pendek, dan sandal.";
        }


        //rekomendasi outdoor
        if(description.includes("rain") || description.includes("rainfall")){
          document.getElementById("outdoor").innerText = "Not enough";
          document.getElementById("recommendations").innerText = "- Cuaca kurang mendukung untuk kegiatan di luar ruangan.";
        }else if(description.includes("clear")){
          document.getElementById("outdoor").innerText = "More";
          document.getElementById("recommendations").innerText = "- Cuaca cukup untuk kegiatan di luar ruangan.";
        }else if(description.includes("clouds")){
          document.getElementById("outdoor").innerText = "Enough";
          document.getElementById("recommendations").innerText = "- Cuaca kurang mendukung untuk kegiatan di luar ruangan.";
        }else{
              document.getElementById("outdoor").innerText = "Not enough";
              document.getElementById("recommendations").innerText = "- Cuaca kurang mendukung untuk kegiatan di luar ruangan.";
          }
      //rekomendasi clothing
      if(description.includes("rain") || description.includes("rainfall")){
          document.getElementById("clothes").innerText = "waterproof";
          document.getElementById("recommendations").innerText = "- Gunakan pakaian tahan air.";
        }else if(description.includes("clear")){
          document.getElementById("clothes").innerText = "Short";
          document.getElementById("recommendations").innerText = "- Gunakan pakaian pendek.";
        }else if(description.includes("snow")){
          document.getElementById("clothes").innerText = "Coat & waterproof";
          document.getElementById("recommendations").innerText = "- Gunakan mantel dan pakaian tahan air.";
        }else{
              document.getElementById("clothes").innerText = "Long";
              document.getElementById("recommendations").innerText = "- Gunakan pakaian panjang.";
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
      
  
      //uv kondisi
      displayUVIndex: function (data) {
          const uvIndex = data.value;

          //let uvCategory;
          if (uvIndex >= 0 && uvIndex <= 2) {
              document.getElementById("uvindex").innerText = "Low";
              document.getElementById("recommendations").innerText = "- Gunakan Sunscreen (SPF 30+).\n- Gunakan pakaian pelindung seperti topi, kacamata hitam, dan pakaian dengan lengan panjang.\n- Hindari paparan langsung matahari pada jam-jam puncak.";
          } else if (uvIndex >= 3 && uvIndex <= 5) {
              document.getElementById("uvindex").innerText = "Medium";
              document.getElementById("recommendations").innerText = "- Gunakan Sunscreen (SPF 30+).\n- Kenakan pakaian pelindung seperti topi, kacamata hitam, dan pakaian dengan lengan panjang.\n- Cari tempat teduh saat sinar matahari paling terik.";
          } else if (uvIndex >= 6 && uvIndex <= 7) {
              document.getElementById("uvindex").innerText = "High";
              document.getElementById("recommendations").innerText = "- Gunakan Sunscreen (SPF 30+).\n- Kenakan pakaian pelindung seperti topi, kacamata hitam, dan pakaian dengan lengan panjang.\n- Hindari paparan langsung matahari pada jam-jam puncak dan cari tempat teduh yang lebih sering.";
          } else if (uvIndex >= 8 && uvIndex <= 10) {
              document.getElementById("uvindex").innerText = "Very high";
              document.getElementById("recommendations").innerText = "- Gunakan Sunscreen (SPF 30+).\n- Kenakan pakaian pelindung seperti topi, kacamata hitam, dan pakaian dengan lengan panjang.\n- Hindari paparan langsung matahari pada jam-jam puncak.\n- Cari tempat teduh dan gunakan payung atau tenda untuk melindungi diri dari sinar matahari.";
          } else if (uvIndex >= 11) {
              document.getElementById("uvindex").innerText = "Extreme";
              document.getElementById("recommendations").innerText = "- Hindari kegiatan di luar ruangan pada jam-jam puncak sinar matahari.\n- Gunakan Sunscreen (SPF 30+) dan kenakan pakaian pelindung yang lengkap.\n- Cari tempat teduh yang lebih sering dan hindari paparan langsung sinar matahari.";
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