import React,{useState} from "react";
import axios from "axios";
export default function SearchEngine(){
  let [weather,setWeather]=useState("");
  let [city,setCity]=useState("");
 
  function showWeather(response){
    setWeather({
      temperature:Math.round(response.data.main.temp),
      wind:Math.round(response.data.wind.speed),
      humidity:response.data.main.humidity,
      description: response.data.weather[0].description,
      icon:` https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }
    function handleSubmit(event){
    event.preventDefault();
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8c78e9e7e9928cd1a2a6f923072c3dec&units=metric`;
    axios.get(apiUrl).then(showWeather);
    }

    function updateCity(event){
    setCity(event.target.value);
    }

    
      if(weather){
        return (
      <div className="SearchEngine">
        <form onSubmit = {handleSubmit}>
         <input type="search" placeholder="Type a city..." onChange = {updateCity}/>
         <input type="submit" value="search" />
        </form>
        <p>The weather in {city} is: </p>
        <ul>
       <li>Temperature: {weather.temperature}°C </li>
       <li> Wind: {weather.wind}km/h</li>
       <li>Humidity: {weather.humidity}% </li>
       <li> description: {weather.description}</li>
       <li> <img src={weather.icon} alt={weather.description}/> </li>
        </ul>
      </div>);
      }else {
        return (
          <div className="SearchEngine">
        <form onSubmit = {handleSubmit}>
         <input type="search" placeholder="Type a city..." onChange = {updateCity}/>
         <input type="submit" value="search" />
        </form>
        <p> Loading...</p>
        </div>);
      }
}
