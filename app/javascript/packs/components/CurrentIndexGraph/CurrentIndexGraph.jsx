import React from "react";
import {
  RadialBar,
  Legend,
  RadialBarChart,
  Tooltip,
  PolarAngleAxis
} from 'recharts';

const CurrentIndexGraph = (props) => {

  const calculateColor = (value, segmentsArray) => {
    return 'red'
  }

  const segmentsObj = {
    no2: [50,100,200,400],
    pm10: [25,50,90,180],
    pm25: [15,30,55,110],
    o3: [60,120,180,240]
  }

  const formatData = (waqiData, indexList) => {
    let result = []
    for (let index of indexList) {
      if (waqiData[index]) {
        result.push({
          name: index,
          value: waqiData[index].v,
          pct: segmentsObj[index],
          fill: calculateColor(waqiData[index].v, segmentsObj[index])
        })
      }
    }
    return result
  }
  const data = formatData(props.iaqi, ['o3', 'pm10', 'pm25', 'no2'])

  return(
    <>
      <RadialBarChart 
      width={720} 
      height={700} 
      data={data}
      innerRadius="10%" 
      outerRadius="80%"
      startAngle={180} 
      endAngle={0}
      >
        <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
        {data.map((e, i) => {
          return <PolarAngleAxis key={i} type="number" domain={[0, segmentsObj[e.name][3]]} angleAxisId={i} tick={false} />
        })}
        {data.map((e, i) => {
          return <RadialBar minAngle={15} key={i+10} background dataKey="value" angleAxisId={i} data={[e]} />
        })}
      </RadialBarChart>
    </>
  )
}

export default CurrentIndexGraph;