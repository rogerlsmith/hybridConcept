$(function()
{

	var audioFile;

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
    alert("capture Success");
    var i, path, len;
    for ( i = 0, len = mediaFiles.length; i < len; i += 1 )
    {
        path = mediaFiles[i].fullPath;
    }
    audioFile = path;
};



// capture error callback
var captureError = function ( error )
{
    navigator.notification.alert ( 'Error code: ' + error.code, null, 'Capture Error' );
};


// Upload file to server
function uploadFile ( mediaFile ) 
{
        alert ("uploadFile");
        
    var ft = new FileTransfer ( ),
        path = mediaFile.fullPath,
        name = mediaFile.name;


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
        { uploaded_file: name });
        alert ("uploading file");
}
