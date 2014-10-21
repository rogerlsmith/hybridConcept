
var audioFile = null;
var filePath = "";
var fileName = "";

$(function()
{


    $( "#start" ).click ( function ( e )
    {
    	navigator.device.capture.captureAudio ( captureSuccess, captureError, { limit:2 } );
    });


    $( "#publish" ).click ( function ( e )
    {
     	uploadFile ( audioFile );
    });

});



// capture success callback
var captureSuccess = function ( mediaFiles ) 
{

    var i, path, len;
    audioFile = mediaFiles[0];
    filePath = audioFile.fullPath;
    fileName = audioFile.name;
    
};



// capture error callback
var captureError = function ( error )
{
    navigator.notification.alert ( 'Error code: ' + error.code, null, 'Capture Error' );
};


// Upload file to server
function uploadFile ( ) 
{
    var ft = new FileTransfer ( ),
        path = filePath,
        name = fileName;

    ft.upload ( path,
        "http://rogerlsmith.net/concept/add.php",
        function ( result ) 
        {
            console.log ( 'Upload success: ' + result.responseCode );
            console.log ( result.bytesSent + ' bytes sent' );
        },
        function ( error )
        {
            console.log ( 'Error uploading file ' + path + ': ' + error.code );
            alert ( error.code );
        },
        { fileName: name } );
}
