import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import styles from '.././index.scss';

export default class BarChartViz extends React.Component{
  render(){
    return(
      <div>
          <BarChart width={ 700 } height={ 400 } data={ this.props.data }>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
      </div>
    )
  }
}