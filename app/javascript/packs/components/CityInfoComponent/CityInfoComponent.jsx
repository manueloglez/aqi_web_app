import React from "react";

const CityInfoComponent = (props) => {

  return(
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-10 d-flex flex-column justify-content-center">
            <h3>{props.city.name}</h3>
            <h6 className="mb-2 text-muted">Location: {`${props.city.location[0]}, ${props.city.location[1]}`}</h6>
          </div>
          <div className="col-2">
            <div className="card">
              <div className="card-body">
                <p>Current AQI:</p>
                <h1>{props.aqi.aqi}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CityInfoComponent;