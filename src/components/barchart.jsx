import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import styles from '.././index.scss';

export default class BarChartViz extends React.Component {
  render() {
    return (
      <div>
          <BarChart width={600} height={300} data={this.props.data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="tag"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
      </div>
    )
  }
}