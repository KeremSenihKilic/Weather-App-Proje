const ele = {
  date:document.querySelector(".date"),
  city:document.querySelector(".city"),
  status:document.querySelector(".status"),
  hum:document.querySelector(".hum"),
  feel:document.querySelector(".feel"),
  degree:document.querySelector(".degree"),
  wind:document.querySelector(".wind"),
  img:document.querySelector(".icon img"),
  form:document.querySelector("form"),
  locations:document.querySelector(".locations"),
  locBtn:document.querySelector("#locBtn"),
  rise:document.querySelector("#rise"),
  set:document.querySelector("#set"),
  highest:document.querySelector("#highest"),
  lowest:document.querySelector("#lowest")
};


const api_key = 'f911ac0c75834b1eb01edadaa6efa33c';
//These are data which we get from the console log and write the following codes

function renderUI(data) {
  
  var text = data.sys.country ? ", " + data.sys.country : ""
  ele.city.innerText = data.name +  text;

  ele.status.innerText = data.weather[0].main;

  ele.feel.innerText = data.main.feels_like + "°";

  ele.hum.innerText = data.main.humidity + "%";

  ele.degree.innerText = data.main.temp + "°";

  ele.wind.innerText = data.wind.speed + "km/h";

  ele.img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

  ele.rise.innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString()
  ele.set.innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString()

  ele.highest.innerHTML = data.main.temp_max + "°"
  ele.lowest.innerHTML = data.main.temp_min + "°"
  
}

async function getWeatherData(city) {

  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
    );
   const data = await res.json()

   renderUI(data)
}


document.addEventListener("DOMContentLoaded", function(){
    getWeatherData("Seoul");
});


ele.form.addEventListener("submit", (e)=> {

 e.preventDefault()

  const city = e.target[0].value

  getWeatherData(city)
})

ele.locations.addEventListener("click", (e) =>{

  if(e.target.tagName === "BUTTON"){

    const city = e.target.innerText


   getWeatherData(city)
  }

  

  
})


ele.locBtn.addEventListener("click",()=> {

  navigator.geolocation.getCurrentPosition(async(e)=>{
    console.log(e)
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${e.coords.latitude}&lon=${e.coords.longitude}&units=metric&appid=${api_key}`
    );
   const data = await res.json()
//gelen veriyi ekrana basar
   renderUI(data)

  });
});