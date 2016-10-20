import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

import styles from '../scss/main.scss';

const COLORS = ['#00C49F', '#FFBB28', '#864A8E', '#FF8042', '#8AC926'];

export default class BarChartViz extends React.Component {
  render(){
    const tagCounts = this.props.data;

    return(
      <div>
        <h2>Tag Usage Frequency</h2>
        <BarChart width={ 750 } height={ 400 } data={ tagCounts }
                  className={ styles.viz }>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Bar dataKey="count" fill="#8884d8">
            {
              tagCounts.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
            }
          </Bar>
        </BarChart>
      </div>
    )
  }
}