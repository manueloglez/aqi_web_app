import React from "react";
import {
  RadialBar,
  Legend,
  RadialBarChart,
  Tooltip
} from 'recharts';

const CityInfoComponent = (props) => {

  const calculateColor = (value, segmentsArray) => {
    return 'red'
  }

  const formatData = (waqiData) => {
    return [{
        name: 'no2',
        value: waqiData.no2.v,
        fill: calculateColor(waqiData.no2.v, [50,100,200,400])
      }, {
        name: 'pm10',
        value: waqiData.pm10.v,
        fill: calculateColor(waqiData.pm10.v, [25,50,90,180])
      }, {
        name: 'pm25',
        value: waqiData.pm25.v,
        fill: calculateColor(waqiData.pm25.v, [15,30,55,110])
      }, {
        name: 'o3',
        value: waqiData.o3.v,
        fill: calculateColor(waqiData.o3.v, [60,120,180,240])
      },
    ]
  }
  const data = formatData(props.aqi.iaqi)
  console.log(data)

  return(
    <div>
      <p>Name: {props.city.name}</p>
      <p>Latitude: {props.city.location[0]}</p>
      <p>Longitude: {props.city.location[1]}</p>
      <p>Current AQI: {props.aqi.aqi}</p>
      <RadialBarChart 
        width={730} 
        height={250} 
        innerRadius="10%" 
        outerRadius="80%" 
        data={data} 
        startAngle={180} 
        endAngle={0}
      >
        <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='value' />
        <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
        <Tooltip />
      </RadialBarChart>
    </div>
  )
}

export default CityInfoComponent;