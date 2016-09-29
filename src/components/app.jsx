import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../index.scss';

import React from 'react';
import BarChartViz from './barchart.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <BarChartViz/>
      </div>
    )
  }
}