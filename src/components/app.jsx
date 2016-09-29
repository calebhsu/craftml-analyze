import React from 'react';
import BarChartViz from './barchart.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../index.scss';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <BarChartViz data={this.props.data} />
      </div>
    )
  }
}