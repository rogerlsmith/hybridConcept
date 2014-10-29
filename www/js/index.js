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
var url         = "http://rogerlsmith.net/concept/add.php";
var ft          = null;


//
// hybridConcept app object
//
var app = {

    //
    // Application Initializer
    //
    initialize: function() 
    {

        this.bindEvents();

    },


    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() 
    {

        document.addEventListener('deviceready', 
                                        this.onDeviceReady, 
                                        false);

    },


    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

     
        //
        // start recording on click
        //
        $("#start").click(function(e)
        {

            navigator.device.capture.captureAudio ( this.captureSuccess, 
                                                    this.captureError, 
                                                    { limit:2 });
        });


        //
        // publish on click
        //
        $("#publish").click(function(e)
        {

            this.uploadFile ( audioFile );

        });



        //
        // browse on click
        //
        $( "#browse" ).click (function ( e )
        {

            var ref = window.open ( 'http://rogerlsmith.net/concept/browse.php', 
                                        '_self', 
                                        'location=no' );
        });

    },


    //
    // capture success callback
    //
    captureSuccess: function ( mediaFiles ) 
    {

        audioFile = mediaFiles[0];
        filePath = audioFile.fullPath;
        fileName = audioFile.name;
        
    },


    //
    // capture error callback
    //
    captureError: function ( error )
    {

        navigator.notification.alert ( 'Error code: ' + error.code, 
                                            null,
                                            'Capture Error' );

    },


    //
    // Upload file to server
    //
    uploadFile: function ( ) 
    {
      
/*      
        if $("#private").prop('checked', true);
        {
            url = "http://rogerlsmith.net/concept/privateadd.php";
        }
*/
        ft = new FileTransfer ( );

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

};

app.initialize();