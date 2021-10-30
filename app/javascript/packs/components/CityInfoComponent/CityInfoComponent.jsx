import React from "react";

const CityInfoComponent = ({city, aqi}) => {
  const segments = [
    [50, 'Good', '#00FF0050'], 
    [100, 'Moderate', '#FFFF0050'], 
    [150, 'Unhealthy for Sensitive Groups', '#ff7e0050'], 
    [200, 'Unhealthy', '#FF000050'], 
    [300, 'Very unhealthy', '#99004c50']
  ]

  const calculateStatus = (aqi) => {
    const label = segments.find(e => e[0] > aqi)[1]
    return label || '#7e002350'
  }

  const calculateColor = (aqi) => {
    const label = segments.find(e => e[0] > aqi)[2]
    return label || '#00FF0050'
  }


  return(
    <> 
      <div className="card mb-3" style={{height: '200px'}}>
        {city ? 
        <div className="card-body">
          <div className="row">
            <div className="col-lg-10 col-sm-8 col-7 d-flex flex-column justify-content-center">
              <h3>{city.name}</h3>
              <h6 className="mb-2 text-muted">Location: {`${city.location[0]}, ${city.location[1]}`}</h6>
            </div>
            <div className="col-lg-2 col-sm-4 col-5">
            {aqi ? <div className="card" style={{backgroundColor: calculateColor(aqi.aqi)}}>
                <div className="card-body d-flex flex-column align-items-center">
                  <p className="p-0">Current AQI:</p>
                  <h1>{aqi.aqi}</h1> 
                  <h4>{calculateStatus(aqi.aqi)}</h4>
                </div>
              </div> : '' }
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