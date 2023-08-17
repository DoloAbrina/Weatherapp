import './App.css'
// import { FaSearch } from "@react-icons/all-files/fa/FaSearch"
import { ImCompass } from "@react-icons/all-files/im/ImCompass"
import { WiWindBeaufort4 } from "@react-icons/all-files/wi/WiWindBeaufort4"
import { WiHumidity } from "@react-icons/all-files/wi/WiHumidity"
import { WiRain } from "@react-icons/all-files/wi/WiRain"
import { useState } from 'react'

function App() {

  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [condition, setCondition] = useState("");
  const [humidity, setHumidity] = useState("0");
  const [wind, setWind] = useState("0");
  const [temp, setTemp] = useState("0");

  const apiKey = "4321aa33261c287c7852c5923a76a650";
  const apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`

  console.log(apiLink)
  const handleChange = (e) => {
    // e.preventDefault();
    setLocation(e)
  }

  const searchLocation = () => {
    // const apiLink = "https://api.example.com/locations";
  
    fetch(apiLink)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.name);
        setCity(data.name);
        setCondition(data.weather[0].description)
        setTemp(data.main.temp);
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
      })
      .catch((err) => {
        console.error("error fetching data: ", err);
      });
  };


  return (
    <div className='weather-app'>
      <div className='app-name'>
        {/* <h1>WeatherApp</h1> */}
        <div className='search-icon'>
          <input type='text' onChange={(e) => handleChange(e.target.value)} />
          <ImCompass className='s-icon' onClick={searchLocation} />
        </div>
      </div>
      <div className='location'>
        <h1 className=''>{city}</h1>
        <h6 className=''>Thursday, August 17, 2023</h6>
      </div>
      <div className='temperature'>
        <span className='temp'>{Math.floor(temp)}&deg;C</span>
        <span className='condition'>{condition}</span>
        <span className='min_max'>18&deg;/20&deg;</span>
      </div>
      <div className='extra-info'>
        <div className='row'>
          <span><WiWindBeaufort4 size={30} /></span>
          <span>{Math.floor(wind)} KMH</span>
        </div>
        <div className='row'>
          <span><WiHumidity size={30} /></span>
          <span>{Math.floor(humidity)}</span>
          {/* <span>20&deg;/25&deg;</span> */}
        </div>
        <div className='ls-row'>
          <span><WiRain size={30} /></span>
          <span>10%</span>
        </div>
      </div>
    </div>
  )
}

export default App
