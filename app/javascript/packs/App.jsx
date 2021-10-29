import React, { useState, useEffect } from 'react'
import { WAQI } from './requests'

import CustomAutoSuggest from './components/autosuggest_component/AutosuggestComponent'
import AqiSummaryComponent from './components/AqiSummaryComponent/AqiSummaryComponent'
import CityInfoComponent from './components/CityInfoComponent/CityInfoComponent'

function App() {
  let [ city, setCity ] = useState(null)
  let [ aqi, setAqi ] = useState({data: null})
  let [ warning, setWarning ] = useState(false)

  useEffect(() => {
    if (city && aqi) {
      console.log(aqi.data)
      console.log(getDistanceFromLatLonInKm(...city.location, ...aqi.data.city.geo))
      if (getDistanceFromLatLonInKm(...city.location, ...aqi.data.city.geo) > 50) {
        setWarning(true)
      }
      console.log(city.location, aqi.data.city.geo)
    }
  }, [aqi])

  const onCitySelected = (cityInfo) => {
    setCity(cityInfo)
    const location = cityInfo.location
    WAQI.geolocalized(location[0], location[1])
      .then(setAqi)
  }

// https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}
  
const deg2rad = (deg) => {
  return deg * (Math.PI/180)
}

  return (
    <div className="container">
      { warning ? 
        <div className="alert alert-warning alert-dismissible fade show">
          <strong>Warning: </strong> The nearest station is more than 50km away from the city you are looking for. Data might not be accurate.
          <button type="button" className="btn-close" onClick={() => setWarning(false)}></button>
        </div> : ''
      }
      <h1 className="my-3">Air Quality Index Graphing</h1>
      <div className="row">
        <CustomAutoSuggest onCitySelected={onCitySelected}/>
      </div>
      <div className="row">
        <div className="col">
          <CityInfoComponent city={city} aqi={aqi.data}/> 
          <AqiSummaryComponent aqi={aqi.data}/> 
        </div>
      </div>
    </div>
  )
}

export default App;