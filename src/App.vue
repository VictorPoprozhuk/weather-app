<template>
   <div id="app" :style="{ backgroundImage: `url(${getBg})` }">
      <audio ref="audio" :src="`${publicPath}${getSound}`" preload loop id="audio"
         muted></audio>
      <main>
         <div class="search-box">
            <input type="text" class="search-bar" placeholder="Search..."
               v-model="query" @keypress.enter="fetchWeather" />
            <button class="btn" @click="fetchWeather">
               <img
                  src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/search-512.png"
                  alt="search"></button>
         </div>

         <div class="error" v-show="error">
            No such country found
         </div>
         <div class="weather-wrap" v-if="weather !== null">
            <div class="location-box">
               <div class="location">
                  {{ weather.name }}, {{ weather.sys.country }}
               </div>
               <div class="date">{{ dateNow }}</div>
            </div>

            <div class="weather-box">
               <div class="temp">
                  {{ Math.round(weather.main.temp) }}°
               </div>
               <div class="weather">
                  {{ weather.weather[0].main }}
               </div>
            </div>
         </div>
         <button class="btn-muted" @touchmove="onSound" @click="onSound">
            Muted
         </button>
      </main>
   </div>
</template>

<script>
import axios from "axios";

export default {
   data() {
      return {
         api_key: "a10315cfb8cdfd4d85dd0fcded5ca4b0",
         url_base: "https://api.openweathermap.org/data/2.5/",
         query: "",
         weather: null,
         error: false,
         publicPath: process.env.BASE_URL,
         muted: false,
         timezone: null,
      };
   },
   methods: {
      async fetchWeather() {
         let audio = this.$refs.audio;
         audio.pause();
         this.muted = true;
         if (this.query !== "") {
            this.error = false;
            try {
               const data = await axios.get(
                  `${this.url_base}weather?q=${this.query}&units=metric&appid=${this.api_key}`
               );

               setTimeout(() => {
                  audio.play();
                  this.muted = false;
               }, 1000);

               this.weather = data.data;
               this.timezone = data.data.timezone / 3600;
            } catch (error) {
               this.weather = null;
               this.error = true;
            }
         }
      },
      onSound() {
         if (this.weather !== null) {
            let audio = this.$refs.audio;

            if (this.muted === false) {
               this.muted = true
               audio.pause();
               return
            }
            audio.play()
            this.muted = false
         }
      },
   },

   computed: {
      getSound() {
         if (this.weather !== null) {
            switch (this.weather.weather[0].main) {
               case "Rain":
                  return "Rain.mp3";
               case "Clear":
                  return "Clear.mp3";
               case "Clouds":
                  return "Clouds.mp3";
               case "Snow":
                  return "Snow.mp3"
            }
         }
      },
      getBg() {
         if (this.weather === null) {
            return "https://static.vecteezy.com/system/resources/previews/002/099/715/non_2x/mountain-beautiful-landscape-background-design-illustration-free-vector.jpg";
         } else
            switch (this.weather.weather[0].main) {
               case "Rain":
                  return "https://media.freestocktextures.com/cache/e1/3d/e13dbdfceb33473e2e1be208dd67d89d.jpg";
               case "Clear":
                  return "https://media.istockphoto.com/photos/sun-on-blue-sky-with-clouds-picture-id824800468?k=20&m=824800468&s=612x612&w=0&h=Av3vLFHV48dsNZCQEg9A3Ga5qq1L2tdrsJ7fbNrqVKg=";
               case "Clouds":
                  return "https://c1.wallpaperflare.com/preview/748/977/304/storm-sky-cloudy-weather.jpg";
               case 'Snow':
                  return "https://img.freepik.com/premium-vector/vector-snowfall-isolated-winter-background-snow-overlay-snowflakes-ice-snow-landscape_165143-1243.jpg?w=900"
            }
      },
      dateNow() {
         const d = new Date();
         let t = this.timezone;

         const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
         ];
         const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
         ];

         let day = days[d.getUTCDay(t)] + " ";
         let date = d.getUTCDate(t) + " ";
         let month = months[d.getUTCMonth(t)] + " ";
         let year = d.getUTCFullYear(t) + " ";

         return day + date + month + year;
      },
   },
};
</script>

<style lang="scss">
* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
}

body {
   font-family: "monserrat" sans-serif;
}

#app {
   background-size: cover;
   background-position: bottom;
   background-origin: unset;
   background-repeat: no-repeat;
   transition: 0.4s;
}

main {
   min-height: 100vh;
   padding: 25px;
   display: flex;
   flex-direction: column;
   align-items: center;
}

.search-box {
   width: 100%;
   margin-top: 30px;
   position: relative;
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 10px 15px;
   border-radius: 10px;
   background-color: rgba(255, 255, 255, 0.7);
   box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

   @media screen and (min-width: 600px) {
      width: 50%;
   }

   .btn {
      border: none;
      outline: none;
      width: 40px;
      height: 100%;
      cursor: pointer;
      background: transparent;

      img {
         display: block;
         width: 100%;
      }
   }
}

.weather-wrap {
   margin-top: 50px;

   @media screen and (max-width: 600px) {
      margin-top: 20px;
   }
}

.search-box .search-bar {
   display: block;
   width: 100%;

   color: #313131;
   font-size: 20px;

   appearance: none;
   border: none;
   outline: none;
   background: none;
}


.location-box {
   .location {
      color: #fff;
      font-size: 32px;
      font-weight: 500;
      text-align: center;
      text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
   }

   .date {
      color: #fff;
      font-size: 20px;
      font-weight: 300;
      text-align: center;
      font-style: italic;
   }
}

.weather-box {
   text-align: center;

   .temp {
      display: inline-block;
      padding: 10px 25px;
      color: #fff;
      font-size: 102px;
      font-weight: 900;
      text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
      background-color: rgba(255, 255, 255, 0.25);
      border-radius: 16px;
      margin: 30px 0;

      box-shadow: 3px 6px rgba(0, 0, 0, 0.25);

      @media screen and (max-width: 600px) {
         font-size: 50px;
      }
   }

   .weather {
      color: #fff;
      font-size: 48px;
      font-weight: 700;
      font-style: italic;
      text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
      @media screen and (max-width: 600px) {
         font-size: 36px;
      }
   }
}

.error {
   margin-top: 10px;
   color: #000;
   font-size: 25px;
   text-align: center;
}

.btn-muted {
   padding: 10px 25px;
   color: #000;
   font-size: 20px;
   font-weight: 900;
   background-color: rgba(255, 255, 255, 0.25);
   border-radius: 16px;
   border: none;
   margin: 30px 0;
   position: fixed;
   bottom: 0;
   left: 20px;
   box-shadow: 0px 6px rgb(0, 0, 0, 0.4);
   cursor: pointer;
   transition: box-shadow 0.3s, transform 0.3s;

   &:active {
      transform: translate(0px, 3px);
      box-shadow: none;
   }
}
</style>
