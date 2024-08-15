import React, { useState } from 'react'
import "./app.css"
// import {cloud} from "./cloud.png"

function App() {
  let [city, setCity] = useState("")
  let [finalValue, setFinalValue] = useState()
  let [isLoading, setIsLoading] = useState(false)

  let inputValue = (e) => {
    setCity(e.target.value)
  }
  let btnclick = (e) => {
    setIsLoading(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
      .then((res) => res.json())
      .then((res) => {
        if (res.cod == "404") {
          setFinalValue()
        }
        else {
          setFinalValue(res)
        }
        setIsLoading(false)
      })
    setCity("")
    e.preventDefault()
  }
  return (
    <>
      <form action="" onSubmit={btnclick}>
        <main>
          <h1 className='heading'>Weather App</h1>
          <div className="row">
            <input
              type="text"
              name=""
              id="input"
              placeholder="Search by city name"
              className="input"
              value={city}
              onChange={inputValue}
              autocomplete="off"
            />
            <button className="btn" >click</button>
          </div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="" className={`img ${(isLoading) ? "hideImg" : ""}`} />
          {(finalValue !== undefined)
            ?
            <div className="row2" id="weather">
              <div className="city"> {finalValue.name}, </div> <span> {finalValue.sys.country} </span>
              <div className="img2">
                <img src={`http://openweathermap.org/img/w/${finalValue.weather[0].icon}.png`} alt="" className="image" />
              </div>
              <div>
                <h2 className="temp"> {finalValue.main.temp}°C</h2>
                <h4 className="weather"> {finalValue.weather[0].description} </h4>
              </div>
            </div>
            :
            <div className="noDatafiled">
              <div className="noData">No Data</div>
            </div>
          }

        </main>
      </form>
    </>
  )
}

export default App