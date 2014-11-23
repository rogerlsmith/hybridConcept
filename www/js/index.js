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
var url         = "http://rogerlsmith.net/concept/bower_components/bootstrap/mobile/audio.php";
var ft          = null;


//
// hybridConcept app object
//
var app =
{

    //
    // Application Initializer
    //
    initialize: function() 
    {

        app.bindEvents();

    },


    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() 
    {

        document.addEventListener('deviceready', 
                                        app.onDeviceReady, 
                                        false);

    },


    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function ( ) 
    {
     
        //
        // start recording on click
        //
        $( "#start" ).click ( function ( e )
        {

            navigator.device.capture.captureAudio ( app.captureSuccess, 
                                                    app.captureError, 
                                                    { limit:2 });
        });


        //
        // publish on click
        //
        $( "#publish" ).click ( function ( e )
        {

            app.uploadFile ( audioFile );

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


        //
        // login on click
        //
        $( "#loginForm" ).on ( "submit", function ( e )
        {

            //disable the button so we can't resubmit while we wait
            $("#submitButton",this).attr("disabled","disabled");

            var u = $("#username", this).val();
            var p = $("#password", this).val();

            if ( u != '' && p != '' )
            {
                $.post( "http://rogerlsmith.net/concept/bower_components/bootstrap/mobile/user.php?method=login&returnformat=json", { username: u, password:p }, function ( res )
                {
                    if(res == true) {
                        $.mobile.changePage( "success.html" );
                    } else {
                        navigator.notification.alert( "Your login failed", function ( ) { } );
                    }
                    $( "#submitButton" ).removeAttr( "disabled" );
                },"json");
            }
            return false;
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

        tagMessage = $( "#tags" ).is ( ':checked' );

        if (tagMessage === true )
        {

        }

        
        privMessage = $( "#private" ).is ( ':checked' );

        if ( privMessage === true )
        {
            method = "private";
        } else 
        {
            method = "public";
        }

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

            {
                fileName: fileName,
                method: method
            }
        );

    }

};

app.initialize();