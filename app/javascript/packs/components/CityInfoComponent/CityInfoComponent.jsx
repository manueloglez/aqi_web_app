import React from "react";

const CityInfoComponent = (props) => {
  return(
    <div>
      <p>Name: {props.city.name}</p>
      <p>Latitude: {props.city.location[0]}</p>
      <p>Longitude: {props.city.location[1]}</p>
      <p>Current AQI: {props.aqi.aqi}</p>
    </div>
  )
}

export default CityInfoComponent;