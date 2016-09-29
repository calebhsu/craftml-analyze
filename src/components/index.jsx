import React from 'react';
import { render } from 'react-dom';
import * as firebase from 'firebase';
import App from './app.jsx';

const config = {
  apiKey: "AIzaSyAu5HYmep8Ik_MDeJEcd5AMwDVqknn8E84",
  authDomain: "craftml-io-development.firebaseapp.com",
  databaseURL: "https://craftml-io-development.firebaseio.com",
  storageBucket: "craftml-io-development.appspot.com",
  messagingSenderId: "728797607641"
};

firebase.initializeApp(config);

var craftDb = firebase.database();
var modelDbRef = craftDb.ref( 'docs' );

var modelCollection, modelSample;
var modelSampleSize = 100;

var regexCube     = /<cube/gi;
var regexCylinder = /<cylinder/gi;
var regexSphere   = /<sphere/gi;

var tagCounts =
[{
    'cube':     0,
    'cylinder': 0,
    'sphere':   0
}]

modelDbRef.once( 'value', function( snapshot ){
  // creates array of model code, excluding empty code
  modelCollection = _.pull(
                    _.map( snapshot.val(), function( prop, modelId ){
                          if( prop[ 'content' ] ){
                              return prop[ 'content' ];
                          }
                    } ) , undefined );

  // gets random sample of 100 models in array
  modelSample = _.sampleSize( modelCollection, modelSampleSize );

  // returns collection of tags & tag counts
  _.forEach( modelSample , function( content, index ){
      tagCounts[ 'cube' ]     += ( content.match( regexCube ) || [] ).length
      tagCounts[ 'cylinder' ] += ( content.match( regexCylinder ) || [] ).length
      tagCounts[ 'sphere' ]   += ( content.match( regexSphere ) || [] ).length
  } );
} );


render(<App data={tagCounts} />, document.querySelector("#app"));