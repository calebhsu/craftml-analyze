import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import styles from '../scss/main.scss';

export default class BarChartViz extends React.Component{
  render(){
    return(
      <div>
        <h2>Tag Usage Frequency</h2>
        <BarChart width={ 750 } height={ 400 } data={ this.props.data }
                  className={ styles.viz }>
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