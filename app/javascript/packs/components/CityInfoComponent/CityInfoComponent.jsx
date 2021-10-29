import React from "react";

const CityInfoComponent = (props) => {

  return(
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.city.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Location: {`${props.city.location[0]}, ${props.city.location[1]}`}</h6>
        <p className="card-text">Current AQI: {props.aqi.aqi}</p>
      </div>
    </div>
  )
}

export default CityInfoComponent;