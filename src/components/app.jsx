import React from 'react';
import Header from './header.jsx';
import BarChartViz from './barchart.jsx';
import PieChartViz from './piechart.jsx';
import tagCounts from 'json!../../tag-counts.json';

import styles from '../scss/main.scss';

export default class App extends React.Component{
  render() {
    return (
      <div>
        <Header/>
        <main className={ styles.container }>
          <div className="row">
            <div className="col-md-8">
              <BarChartViz data={ tagCounts }/>
            </div>
            <div className="col-md-4">
              <PieChartViz data={ tagCounts }/>
            </div>
          </div>
        </main>
      </div>
    )
  }
}