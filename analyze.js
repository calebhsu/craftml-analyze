var firebase = require( 'firebase' );
var _ = require( 'lodash' );
var fs = require( 'fs' )

firebase.initializeApp( {
    serviceAccount:  'serviceAccountCredentials.json',
    databaseURL:     'https://craftml-io-development.firebaseio.com/'
} );

var craftDb = firebase.database();
var modelDbRef = craftDb.ref( 'docs' );

var modelCollection, modelSample;

var regexCube =     /<cube/gi;
var regexCylinder = /<cylinder/gi;
var regexSphere =   /<sphere/gi;

var modelSampleSize = 100;
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

    _.forEach( modelSample , function( content, index ){
        tagCounts[ 'cube' ]     += ( content.match( regexCube ) || [] ).length
        tagCounts[ 'cylinder' ] += ( content.match( regexCylinder ) || [] ).length
        tagCounts[ 'sphere' ]   += ( content.match( regexSphere ) || [] ).length
    } );

    console.log( tagCounts )

    modelSample = JSON.stringify( modelSample );

    fs.writeFile( 'test.json', modelSample, function( err ){
        if( err ){
            return console.log(err);
        }
        console.log( "The file was successfully saved." );
    } );

}, function( errorObject ){
    console.log("Failed" + errorObject)
} );

return;