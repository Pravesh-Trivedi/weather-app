const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currWeatherIems1 = document.getElementById("current-weather-items");

const timezone = document.getElementById("timezone");
const country = document.getElementById("country");
const weatherforcastEl = document.getElementById("weather-forcast");
const currtemp = document.getElementById("temp");

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY = "905552394f8de6330577d09a4e8f63ee";

setInterval(()=>{
       const time = new Date();
       const month = time.getMonth();
       const date = time.getDate();
       const day = time.getDay();
       const hour = time.getHours();
      const hourin12format = hour >= 13 ? hour%12 : hour
      const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = hourin12format +':'+minutes+' '+`<span id="am-pm">${ampm}
    </span>`;

    dateEl.innerHTML = days[day]+'   '+date+'  '+months[month];
},1000);


getWeatherdata();
function getWeatherdata(){
navigator.geolocation.getCurrentPosition((success)=>{
 

     let {latitude, longitude} = success.coords;
 
     const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forcast?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`;


     fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
       
        console.log(data);
        showeatherData(data);
            
        });
 
    
})
}


function showeatherData(data){
   let {humidity,pressure,wind_speed} = data.main;
    let{sunrise,sunset} = data.sys;

     currWeatherIems1.innerHTML=` <div class="weather-items">
     <div>Humidity</div>
     <div>${humidity}</div>
 </div>
 
 <div class="weather-items">
     <div>Pressure</div>
     <div>${pressure}</div>
 </div>
 <div class="weather-items">
     <div>Sunrise</div>
     <div>${sunrise}</div>
 </div>
 <div class="weather-items">
     <div>Sunset</div>
     <div>${sunset}</div>
 </div>
 
 <div class="weather-items">
     <div>Wind Speed</div>
     <div>${wind_speed}</div>
 </div>`;
  
}
