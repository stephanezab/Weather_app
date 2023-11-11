const apiKey = "eff517a07ef96f0d21b981bc2aec049c"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units="

const searchbox = document.querySelector(".search input")
const searchbtn = document.querySelector(".search button")
const icon = document.querySelector(".weather-icon")
const changeunit = document.querySelector("#change")


let unit = "metric"

async function checkWeather(city, unit){
    const response = await fetch(apiUrl +`${unit}`+`&q=${city}`+ `&appid=${apiKey}`)
    if(response.status == 404){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }
    else{
        
        let data = await response.json()
        console.log(data)
        document.querySelector(".city").textContent = data.name
        if(unit == "metric"){
            document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C"
            document.querySelector(".humidity").textContent = data.main.humidity + "%"
            document.querySelector(".wind").textContent = data.wind.speed + "km/h"
        }else{
            document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°F"
            document.querySelector(".humidity").textContent = data.main.humidity + "%"
            document.querySelector(".wind").textContent = data.wind.speed + "Mph"

        }
        

        if(data.weather[0].main == "Clouds"){
            icon.src = "images/clouds.png"
        }
        else if (data.weather[0].main == "Clear"){
            icon.src = "images/clear.png"
        }
        else if (data.weather[0].main == "Rain"){
            icon.src = "images/rain.png"
        }
        else if (data.weather[0].main == "Drizzle"){
            icon.src = "images/drizzle.png"
        }
        else if (data.weather[0].main == "Mist"){
            icon.src = "images/mist.png"
        }

        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none"
    }
    
}


searchbtn.addEventListener("click", ()=>{
    checkWeather(searchbox.value, unit)
})

changeunit.addEventListener("click", ()=>{
    if(unit == "metric"){
        unit = "imperial"
    }else{
        unit = "metric"
    }
    checkWeather(searchbox.value, unit)
})