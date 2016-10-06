import React from 'react';
import Header from './header.jsx';
import BarChartViz from './barchart.jsx';
import data from 'json!../../tag-counts.json';

import styles from '../main.scss';

export default class App extends React.Component{
  render() {
    return (
      <div>
        <Header/>
        <main className={ styles.container }>
          <BarChartViz data={ data }/>
        </main>
      </div>
    )
  }
}