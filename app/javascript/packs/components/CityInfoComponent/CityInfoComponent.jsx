import React from "react";

const CityInfoComponent = ({city, aqi}) => {

  return(
    <> 
      <div className="card" style={{height: '160px'}}>
        {city ? 
        <div className="card-body">
          <div className="row">
            <div className="col-10 d-flex flex-column justify-content-center">
              <h3>{city.name}</h3>
              <h6 className="mb-2 text-muted">Location: {`${city.location[0]}, ${city.location[1]}`}</h6>
            </div>
            <div className="col-2">
              <div className="card">
                <div className="card-body">
                  <p>Current AQI:</p>
                  {aqi ? <h1>{aqi.aqi}</h1> : ''}
                </div>
              </div>
            </div>
          </div>
        </div> : 
        <div className="card-body d-flex align-items-center">
          <h2 className="text-muted">Search for a city first...</h2>
        </div>}
      </div>
    </>
    
  )
}

export default CityInfoComponent;