import React from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8AC926', '#864A8E'];

export default class PieChartViz extends React.Component {
  render(){
    let tagCounts = this.props.data;

    return(
      <PieChart width={ 800 } height={ 400 } onMouseEnter={ this.onPieEnter }>
        <Pie
          nameKey="name"
          valueKey="count"
          data={ tagCounts }
          outerRadius={ 80 }
        >
          {
            tagCounts.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    );
  }
}