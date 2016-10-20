import React from 'react';
import Header from './header.jsx';
import BarChartViz from './barchart.jsx';
import PieChartViz from './piechart.jsx';
import tagCounts from 'json!../../tag-counts.json';

import styles from '../scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component{
  render() {
    return (
      <div>
        <Header/>
          <div className="row">
            <div className="col-md-5">
              <h3>Tag Usage Frequency</h3>
              <PieChartViz data={ tagCounts }/>
            </div>
            <div className="col-md-7">
              <BarChartViz data={ tagCounts }/>
            </div>
          </div>
      </div>
    )
  }
}