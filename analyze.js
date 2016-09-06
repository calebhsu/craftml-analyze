var firebase = require( 'firebase' );
var _ = require( 'lodash' );
var fs = require( 'fs' )

firebase.initializeApp( {
    serviceAccount:  'serviceAccountCredentials.json',
    databaseURL:     'https://craftml-io-development.firebaseio.com/'
} );

var craftDb = firebase.database();
var modelDbRef = craftDb.ref( 'docs' );

var totalModels, modelArray;

modelDbRef.once( 'value', function( snapshot ){
    totalModels = _.size( snapshot.val() );

    // creates array of all model content
    modelArray = _.map( snapshot.val(), function( val, key ){
        return val[ 'content' ];
    } );
    modelArray = JSON.stringify( modelArray );

    // snapshot.forEach( function( model ){
    // } );

    fs.writeFile( 'test.json', modelArray, function( err ){
        if( err ){
            return console.log(err);
        }
        console.log( "The file was successfully saved." );
    } );
}, function( errorObject ){
    console.log("Failed" + errorObject)
} );

return;