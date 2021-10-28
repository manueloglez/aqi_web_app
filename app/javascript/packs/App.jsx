import React, { useState } from 'react'
import { WAQI } from './requests'

import CustomAutoSuggest from './components/autosuggest_component/AutosuggestComponent'
import AqiSummaryComponent from './components/AqiSummaryComponent/AqiSummaryComponent'
import CityInfoComponent from './components/CityInfoComponent/CityInfoComponent'

function App() {
  let [ city, setCity ] = useState(null)
  let [ aqi, setAqi ] = useState(null)

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
    <>
      <CustomAutoSuggest onCitySelected={onCitySelected}/>
      {city && aqi ? <> 
        <CityInfoComponent city={city} aqi={aqi.data}/> 
        <AqiSummaryComponent aqi={aqi.data} city={city}/> 
        </>
      : '' }
    </>
  )
}

export default App;