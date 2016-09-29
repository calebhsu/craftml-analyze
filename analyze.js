// var firebase = require( 'firebase' );
// var fs       = require( 'fs' )
// var _        = require( 'lodash' );

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAu5HYmep8Ik_MDeJEcd5AMwDVqknn8E84",
    authDomain: "craftml-io-development.firebaseapp.com",
    databaseURL: "https://craftml-io-development.firebaseio.com",
    storageBucket: "craftml-io-development.appspot.com",
    messagingSenderId: "728797607641"
  };
  firebase.initializeApp(config);

// firebase.initializeApp( {
//     serviceAccount:  'serviceAccountCredentials.json',
//     databaseURL:     'https://craftml-io-development.firebaseio.com/'
// } );

var craftDb = firebase.database();
var modelDbRef = craftDb.ref( 'docs' );

var modelCollection, modelSample;
var modelSampleSize = 100;

var regexCube =     /<cube/gi;
var regexCylinder = /<cylinder/gi;
var regexSphere =   /<sphere/gi;

var tagCounts = {
                    'cube':     0,
                    'cylinder': 0,
                    'sphere':   0
                }

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

    // console.log(tagCounts)
    // tagCounts = JSON.stringify( tagCounts );

    // fs.writeFile( 'tag-counts.json', tagCounts, function( err ){
    //     if( err ){
    //         return console.log(err);
    //     }
    //     console.log( "The file was successfully saved." );
    // } );

});