var firebase = require( 'firebase' );
firebase.initializeApp( {
    // serviceAccount:  need service account file here,
    databaseURL: 'https://craftml-io-development.firebaseio.com/'
} );

var craftDb = firebase.database();
var modelRef = craftDb.ref( 'docs' );

modelRef.on( 'value', function( snapshot ){
	console.log(snapshot.val())
}, function( errorObject ){
	console.log("Failed" + errorObject)
} );

return;