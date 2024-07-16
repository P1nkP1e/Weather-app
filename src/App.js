import React, {useState} from "react";
import axios from "axios";
import {setSelectionRange} from "@testing-library/user-event/dist/utils";
function App() {
  const [data,setData] = useState({});
  const [location, setLocation] = useState('')

  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=e657d3da284f7025d0421185fbac41e3`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  const convertToCels = (temp) => {
    return ((temp - 32) * 5 / 9).toFixed(1);
  };


  return (
   <div className="app">
     <div className='search'>
       <input
           value={location}
           onChange={event => setLocation(event.target.value)}
           onKeyPress={searchLocation}
           placeholder='Search'
           type='text'/>

     </div>
   <div className="container">
   <div className="top">
   <div className="location">
        <p>{data.name}</p>
   <div/>
        <div className="temp">
          {data.main ? <h1>{convertToCels(data.main.temp)}°C</h1> : null}
        </div>
        <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
        </div>

     {data.name != undefined &&

     <div className="bottom">
       <div className="feels">
         {data.main ? <p className='bold'>{convertToCels(data.main.feels_like)}°C</p> : null}
         <p>Feels Like</p>
       </div>
       <div className="humidity">
         {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
         <p>Humidity</p>
       </div>
       <div className="wind">
         {data.wind ? <p className='bold'>{data.wind.speed.toFixed()}MPH</p> : null}
         <p>Wind Speed</p>
       </div>
     </div>
       }


   </div>
   </div>
   </div>
  );
}

export default App;
