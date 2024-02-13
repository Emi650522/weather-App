import React from 'react'
import './WeatherApp.css'

import searchIcon from '../../Assets/search.png';
import clearIcon from '../../Assets/clear.png';
import cloudIcon from '../../Assets/cloud.png';
import drizzleIcon from '../../Assets/drizzle.png';
import rainIcon from '../../Assets/rain.png';
import snowIcon from '../../Assets/snow.png';
import windIcon from '../../Assets/wind.png';
import humidityIcon from '../../Assets/humidity.png';
import { useState } from 'react';

const WeatherApp = () => {
  
  const [icon, setIcon] = useState(drizzleIcon);
  let apiKey = "1f406baba1046ee5be9682161805a22d";

  //async-> devuelvo una Promise
  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      alert("You have to input some city Name!!")
      return 0;
    }

    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${apiKey}`;

    //API CALL//
    let response = await fetch(apiURL);
    let data = await response.json();

    const temp = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-speed");
    //DATA SETTING//
    temp[0].innerHTML = Math.floor(data.main.temp) + '°C';
    location[0].innerHTML = data.name;
    humidity[0].innerHTML = data.main.humidity;
    wind[0].innerHTML = Math.floor(data.wind.speed )+ 'km/h';

    if (data.weather[0].icon === '01n' || '01d') {
      setIcon(clearIcon);
    }
    else if
      (data.weather[0].icon === '02n' || '02d') {
      setIcon(cloudIcon);
    }
    else if
      (data.weather[0].icon === '03n' || '03d') {
      setIcon(cloudIcon);
    }
    else if
      (data.weather[0].icon === '09n' || '09d') {
      setIcon(drizzleIcon);
    }
    else if
      (data.weather[0].icon === '10n' || '10d') {
      setIcon(rainIcon);
    }
    else if
      (data.weather[0].icon === '13n' || '13d') {
      setIcon(snowIcon);
    }
  }

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='Search' />
        <div className="search-icon" onClick={() => search()}>
          <img src={searchIcon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={icon} alt="" />
      </div>
      <div className="weather-temp">24°C</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="" className="icon" />
          <div className="data">
            <div className="wind-speed">22 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp
