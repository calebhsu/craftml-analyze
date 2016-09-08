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
var tags, tagFrequency;
var regex;

modelDbRef.once( 'value', function( snapshot ){
    // creates array of indexed model code
    modelCollection = _.pull(
                      _.map( snapshot.val(), function( prop, modelId ){
                            if( prop[ 'content' ] ){
                                return prop[ 'content' ];
                            }
                      } ) , undefined );
    modelCollection = _.mapKeys( modelCollection, function( content, index ){
       return index;
    } );

    // gets random sample of 100 models
    modelSample = _.sampleSize( modelCollection, 1 );

    regex = /(cube)(?!\/cube>)/gi;
    console.log( ( modelSample[0].match( regex ) || [] ).length )

    // tags = [ '<cube>', '<cylinder>', '<sphere>' ];
    // tagFrequency = _.countBy( modelSample, )

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