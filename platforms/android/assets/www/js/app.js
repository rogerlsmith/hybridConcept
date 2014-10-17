$(function() {




    $("#start").click(function(e){
    	navigator.device.capture.captureAudio(captureSuccess, captureError, {limit:2});
    });

     $("#stop").click(function(e){
     	alert("stopping");
    });

    $("#preview").click(function(e){
     	alert("preview audio");
    });
    $("#publish").click(function(e){
     	uploadFile()
    });
});

// capture success callback
var captureSuccess = function(mediaFiles) {
    var i, path, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        // do something interesting with the file
    }
};

// capture error callback
var captureError = function(error) {
    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
};

// Upload files to server
function uploadFile(mediaFile) {
    var ft = new FileTransfer(),
        path = mediaFile.fullPath,
        name = mediaFile.name;

    ft.upload(path,
        "http://rogerlsmith.net/upload.php",
        function(result) {
            console.log('Upload success: ' + result.responseCode);
            console.log(result.bytesSent + ' bytes sent');
        },
        function(error) {
            console.log('Error uploading file ' + path + ': ' + error.code);
        },
        { fileName: name });   
}