//
// Author: Roger L. Smith
// Date: October 2014
//


//
// Globals
//
var audioFile   = null;
var filePath    = "";
var fileName    = "";


//
// hybridConcept app object
//
var app = {

    // Application Constructor
    initialize: function() 
    {
        alert("initialize");
        this.bindEvents();
    },


    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() 
    {
        alert("bindEvents");
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },


    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        alert ("onDeviceReady");

/*        
        //
        // start recording on click
        //
        $("#start").click(function(e) {
            alert ("start");
            navigator.device.capture.captureAudio ( this.captureSuccess, 
                                                    this.captureError, 
                                                    { limit:2 }
                                            );
        });


        //
        // publish on click
        //
        $("#publish").click(function(e) {
            alert("publish");
            this.uploadFile ( audioFile );
        });



        //
        // browse on click
        //
        $( "#browse" ).click (function ( e )
        {
            alert("browse");
            var ref = window.open ( 'http://rogerlsmith.net/concept/browse.php', 
                                        '_self', 
                                        'location=no' );
        });
*/
    },

/*
    //
    // capture success callback
    //
    captureSuccess: function ( mediaFiles ) 
    {
        var i, path, len;
        audioFile = mediaFiles[0];
        filePath = audioFile.fullPath;
        fileName = audioFile.name;
        
    },

    //
    // capture error callback
    //
    captureError: function ( error )
    {
        navigator.notification.alert ( 'Error code: ' + error.code, null, 'Capture Error' );
    },

    //
    // Upload file to server
    //
    uploadFile: function ( ) 
    {
        var url = "";

        var ft = new FileTransfer ( ),
            path = filePath,
            name = fileName;

        if $("#private").attr("checked")
        {
            url = "http://rogerlsmith.net/concept/privateadd.php";
        } else {
            url = "http://rogerlsmith.net/concept/add.php"
        }

        ft.upload ( filePath,
            url,
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
*/
};

alert("commencing initialize");
app.initialize();