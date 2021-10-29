import React, { useState } from "react";
import {
  ComposedChart,
  Line,
  Area,
  ReferenceArea,
  ReferenceLine,
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
  const [index, setIndex] = useState('o3')

  const segmentsObj = {
    no2: [50,100,200,400],
    pm10: [25,50,90,180],
    pm25: [15,30,55,110],
    o3: [60,120,180,240]
  }

  const formatData = (waqiForecast, index) => {
    let source = waqiForecast.forecast.daily[index]
    let max = 0
    return source.map(e => {
      let result = {
        day: e.day, 
        index: e.avg,
        range: [e.min, e.max]
      }
      return result
    })
  }

  const indexNames = {
    pm25: 'PM₂.₅',
    pm10: 'PM₁₀',
    o3: 'O₃'
  }

  let data = {}
  let indexList = ['o3', 'pm10', 'pm25']
  for (let i of indexList) {
    if (props.aqi.forecast.daily[i]) {
      data[i] = formatData(props.aqi, i)
    }
  }



  return(
    <>
    <h3>Individual AQI Index Forecast</h3>
    <ComposedChart
      width={730}
      height={400}
      data={data[index]}
      margin={{
        top: 20, right: 20, bottom: 20, left: 20,
      }}
    >
      <XAxis dataKey="day" />
      <YAxis domain={[0, segmentsObj[index][3]]}/>
      <ReferenceArea y1={0} y2={segmentsObj[index][0]} fill="green" fillOpacity={0.2} />
      <ReferenceArea y1={segmentsObj[index][0]} y2={segmentsObj[index][1]} fill="yellow" fillOpacity={0.2} />
      <ReferenceArea y1={segmentsObj[index][1]} y2={segmentsObj[index][2]} fill="orange" fillOpacity={0.2} />
      <ReferenceArea y1={segmentsObj[index][2]} y2={segmentsObj[index][3]} fill="red" fillOpacity={0.2} />
      <ReferenceArea y1={segmentsObj[index][3]} y2={segmentsObj[index][3] + 100} fill="purple" fillOpacity={0.2} />
      <Area type="monotone" dataKey="range" stroke="blue" fill="blue" fillOpacity="0.2" strokeOpacity="0"/>
      <Line type="monotone" dataKey="index" stroke="blue" dot={false}/>
      <Tooltip />
    </ComposedChart>
    <div className="d-flex justify-content-center">
      {
        Object.keys(data).map((i) => {
          return <button className={i === index ? 'btn btn-primary px-3' : 'btn btn-outline-primary mx-3'} onClick={() => setIndex(i)}>{indexNames[i]}</button>
        })
      }
    </div>

    </>
  )
}

export default AqiSummaryComponent;