

const apiKey = "eff517a07ef96f0d21b981bc2aec049c"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units="

const searchbox = document.querySelector(".search input")
const searchbtn = document.querySelector(".search button")
const icon = document.querySelector(".weather-icon")
const changeunit = document.querySelector("#change")


const urlTime = 'https://location-and-time.p.rapidapi.com/datetime/bycity?city=';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'adcfcf843dmshbece8fc38c39b51p15e9bejsnb04bb45bcd29',
		'X-RapidAPI-Host': 'location-and-time.p.rapidapi.com'
	}
}

async function checktime(city){

    try {
        const response = await fetch(urlTime + `${city}`, options)
        const result = await response.json()
        let hs = result.response.hour
        console.log(result.response.hour)
        return hs
    } catch (error) {
        console.error(error);
    }
    
}




let unit = "metric"

async function checkWeather(city, unit, hs){
    const response = await fetch(apiUrl +`${unit}`+`&q=${city}`+ `&appid=${apiKey}`)
    if(response.status == 404){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }
    else{
        
        let data = await response.json()
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
        
        if(hs >= 17 || hs <= 6){
        
           document.querySelector(".card").style.backgroundImage = "url('images/backgroundDark.jpg')"
        }
        else if(hs > 6 && hs <= 9){

            document.querySelector(".card").style.backgroundImage = "url('images/backgroundset&rise.jpg')"

        }
        else if(hs >= 16 && hs < 17){

            document.querySelector(".card").style.backgroundImage = "url('images/backgroundset&rise.jpg')"

        }
        else{
           document.querySelector(".card").style.backgroundImage = "url('images/backgroundcol.jpg')"
        }

        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none"
    }
    
}


searchbtn.addEventListener("click", async()=>{
    let hours = await checktime(searchbox.value)
    checkWeather(searchbox.value, unit, hours)
})

changeunit.addEventListener("click", async()=>{
    if(unit == "metric"){
        unit = "imperial"
    }else{
        unit = "metric"
    }
    let hours = await checktime(searchbox.value)
    checkWeather(searchbox.value, unit, hours)
})