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
      result[index + ' range'] = [e.min, e.max]
      return result
    })
  }

  let data = []
  data = formatData(data, props.aqi, 'o3')
  data = formatData(data, props.aqi, 'pm10')
  data = formatData(data, props.aqi, 'pm25')

  return(
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
      <Area type="monotone" dataKey="o3 range" stroke="#8884d8" fill="#8884d8" fillOpacity="0.2" strokeOpacity="0"/>
      <Line type="monotone" dataKey="o3" stroke="#8884d8" />
      <Area type="monotone" dataKey="pm10 range" stroke="#ff7300" fill="#ff7300" fillOpacity="0.2" strokeOpacity="0"/>
      <Line type="monotone" dataKey="pm10" stroke="#ff7300" />
      <Area type="monotone" dataKey="pm25 range" stroke="red" fill="red" fillOpacity="0.2" strokeOpacity="0"/>
      <Line type="monotone" dataKey="pm25" stroke="red" />
      <Tooltip />
    </ComposedChart>
  )
}

export default AqiSummaryComponent;