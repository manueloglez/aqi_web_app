import React, { useState } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  AreaChart,
  ResponsiveContainer,
} from 'recharts';

const AqiSummaryComponent = (props) => {

  const formatData = (data, waqiForecast, index) => {
    let source = waqiForecast.forecast.daily[index]
    return source.map(e => {
      let result = data.find(a => a.day === e.day) || {day: e.day}
      result[index] = e.avg
      // result[index + ' range'] = [e.min, e.max]
      return result
    })
  }

  let data = []
  data = formatData(data, props.aqi, 'o3')
  data = formatData(data, props.aqi, 'pm10')
  data = formatData(data, props.aqi, 'pm25')

  console.log(props.aqi)

  return(
    <>
    <h3>7-day Forecast</h3>
    <ComposedChart
      width={730}
      height={250}
      data={data}
      margin={{
        top: 20, right: 20, bottom: 20, left: 20,
      }}
    >
      <XAxis dataKey="day" />
      <YAxis />
      <Legend />
      <Line type="monotone" dataKey="o3" stroke="#8884d8" />
      <Line type="monotone" dataKey="pm10" stroke="#ff7300" />
      <Line type="monotone" dataKey="pm25" stroke="red" />
      <Tooltip />
    </ComposedChart>
    </>
  )
}

export default AqiSummaryComponent;