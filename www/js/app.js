//
// Author: Roger L. Smith
// Date: October 2014
//


//
// global
//
var audioFile   = null;
var filePath    = "";
var fileName    = "";


//
// document ready
//
$( function ( )
{

    //
    // start recording on click
    //
    $( "#start" ).click ( function ( e )
    {
    	navigator.device.capture.captureAudio ( captureSuccess, 
                                                    captureError, 
                                                    { limit:2 }
                                            );
    });


    //
    // publish on click
    //
    $( "#publish" ).click ( function ( e )
    {
     	uploadFile ( audioFile );
    });

    //
    // browse on click
    //
    $( "#browse" ).click ( function ( e )
    {
        var ref = window.open ( 'http://rogerlsmith.net/concept/browse.php', 
                                    '_self', 
                                    'location=no' );
    });

});


//
// capture success callback
//
var captureSuccess = function ( mediaFiles ) 
{

    var i, path, len;
    audioFile = mediaFiles[0];
    filePath = audioFile.fullPath;
    fileName = audioFile.name;
    
};


//
// capture error callback
//
var captureError = function ( error )
{
    navigator.notification.alert ( 'Error code: ' + error.code, null, 'Capture Error' );
};

//
// Upload file to server
//
function uploadFile ( ) 
{
    var ft = new FileTransfer ( ),
        path = filePath,
        name = fileName;

    ft.upload ( filePath,
        "http://rogerlsmith.net/concept/add.php",
        function ( result ) 
        {
            alert ( 'Upload success: ' + result.responseCode );
        },

        function ( error )
        {
            console.log ( 'Error uploading file ' + path + ': ' + error.code );
            alert ( 'Error: ' + error.code );
        },
        { fileName: fileName } );
}
