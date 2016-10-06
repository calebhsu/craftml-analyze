var firebase = require( 'firebase' );
var fs       = require( 'fs' )
var _        = require( 'lodash' );

// Initialize Firebase
firebase.initializeApp( {
    serviceAccount:  'serviceAccountCredentials.json',
    databaseURL:     'https://craftml-io-development.firebaseio.com/'
} );

var craftDb = firebase.database();
var modelDbRef = craftDb.ref( 'docs' );

var modelCollection, modelSample;
var modelSampleSize = 100;

var regexCube =     /<cube/gi;
var regexCylinder = /<cylinder/gi;
var regexSphere =   /<sphere/gi;

var tagCounts = [
    { name: 'cube', count: 0 },
    { name: 'cylinder', count: 0 },
    { name: 'sphere', count: 0 }
]

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
        tagCounts[0].count += ( content.match( regexCube ) || [] ).length
        tagCounts[1].count += ( content.match( regexCylinder ) || [] ).length
        tagCounts[2].count += ( content.match( regexSphere ) || [] ).length
    } );

    tagCounts = JSON.stringify( tagCounts );

    fs.writeFile( 'tag-counts.json', tagCounts, function( err ){
        if( err ){
            return console.log(err);
        }
        console.log( "The file was successfully saved." );
        process.exit();
    } );
});