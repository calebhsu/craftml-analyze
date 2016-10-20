import React from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';

const COLORS = [ '#00C49F', '#FFBB28', '#FF8042', '#8AC926', '#864A8E' ];

const renderActiveShape = ( props ) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
          fill, payload, percent, value } = props;
  const sin = Math.sin( -RADIAN * midAngle );
  const cos = Math.cos( -RADIAN * midAngle );
  const sx = cx + ( outerRadius + 10 ) * cos;
  const sy = cy + ( outerRadius + 10 ) * sin;
  const mx = cx + ( outerRadius + 30 ) * cos;
  const my = cy + ( outerRadius + 30 ) * sin;
  const ex = mx + ( cos >= 0 ? 1 : -1 ) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle">{value}</text>
      <Sector
        cx={ cx }
        cy={ cy }
        innerRadius={ innerRadius }
        outerRadius={ outerRadius }
        startAngle={ startAngle }
        endAngle={ endAngle }
        fill={ fill }
      />
      <Sector
        cx={ cx}
        cy={ cy}
        startAngle={ startAngle }
        endAngle={ endAngle }
        innerRadius={ outerRadius + 6 }
        outerRadius={ outerRadius + 10 }
        fill={ fill }
      />
      <path d={ `M${sx}, ${sy}L${mx}, ${my}L${ex}, ${ey}` } stroke={ fill } fill="none"/>
      <circle cx={ ex } cy={ ey } r={ 2 } fill={ fill } stroke="none"/>
      <text x={ ex + (cos >= 0 ? 1 : -1) * 12 } y={ ey } textAnchor={ textAnchor } fill="#333">{ `${payload.name}` }</text>
      <text x={ ex + (cos >= 0 ? 1 : -1) * 12 } y={ ey } dy={ 18 } textAnchor={ textAnchor } fill="#999">
        { `${(percent * 100).toFixed(1)}% usage` }
      </text>
    </g>
  );
  {/* Source: http://recharts.org/examples#CustomActiveShapePieChart */}
}

export default class PieChartViz extends React.Component {
  constructor(){
    super();
    this.state = {
      active: 0
    }

    this.onPieEnter = this.onPieEnter.bind( this );
  }

  onPieEnter( data, index ){
    this.setState({
      activeIndex: index
    })
  }

  render(){
    let tagCounts = this.props.data;

    return(
      <PieChart width={ 600 } height={ 350 } onMouseEnter={ this.onPieEnter }
                className="mx-auto"
      >
        <Pie
          activeIndex={ this.state.activeIndex }
          activeShape={ renderActiveShape } 
          nameKey="name"
          data={ tagCounts }
          innerRadius={ 30 }
          outerRadius={ 120 }
          valueKey="count"
        >
          {
            tagCounts.map(
              ( entry, index ) => <Cell fill={COLORS[ index % COLORS.length ]}/>
            )
          }
        </Pie>
      </PieChart>
    );
  }
}