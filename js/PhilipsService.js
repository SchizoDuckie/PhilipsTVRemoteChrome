PhilipsRC.factory('PhilipsService', ['SettingsService', "$http",
    function(SettingsService, $http) {

        var urls = {
            sendKey: 'input/key',
            getVolume: 'audio/volume',
            getCurrentSource: 'sources/current',
            getCurrentChannel: 'channels/current',
            getChannelsList: 'channels',
            getSysInfo: 'system',
            getSourcesList: 'sources'
        };

        var getUrl = function(what) {
            return ['http://', SettingsService.get('devices.selected').address, ':', 1925, '/1/', urls[what]].join('');
        };


        var service = {
            /**
                Adjust, AmbilightOnOff, Back, BlueColour, ChannelStepDown, ChannelStepUp, Confirm, 
                CursorDown, CursorLeft, CursorRight, CursorUp, 
                Digit0, Digit1, Digit2, Digit3, Digit4, Digit5, Digit6, Digit7, Digit8, Digit9, Dot,
                FastForward, Find, GreenColour, Home, Info, Mute, Next, Online, 
                Options, Pause, PlayPause, Previous, Record, RedColour, Rewind,  
                Source, Standby, Stop, Subtitle, Teletext, Viewmode, VolumeDown, VolumeUp, WatchTV, YellowColour
           */
            sendKey: function(key) {
                console.log("Send key!", key);
                return $http.post(getUrl('sendKey'), {
                    'key': key
                });
            },
            getCurrentSource: function() {
                return $http.post(getUrl('getCurrentSource'));
            },
            getVolume: function() {
                return $http.post(getUrl('getVolume'));
            },
            getCurrentChannel: function() {
                return $http.post(getUrl('getCurrentChannel'));
            },
            getChannels: function() {
                return $http.post(getUrl('getChannelsList'));
            },
            getSources: function() {
                return $http.post(getUrl('getSourcesList'));
            },
            getSysInfo: function() {
                return $http.post(getUrl('getSysInfo'));
            }

        };
        return service;
    }
]);


/*
function keyboardShortcuts() {
    $(document).keydown(function() {
        if (event.keyCode == 189) {
            sendKeyEvent('VolumeDown')
        }
        if (event.keyCode == 187) {
            sendKeyEvent('VolumeUp')
        }
        if (event.keyCode == 37) {
            sendKeyEvent('CursorLeft')
        }
        if (event.keyCode == 38) {
            sendKeyEvent('CursorUp')
        }
        if (event.keyCode == 39) {
            sendKeyEvent('CursorRight')
        }
        if (event.keyCode == 40) {
            sendKeyEvent('CursorDown')
        }
        if (event.keyCode == 72) {
            sendKeyEvent('Home')
        }
        if (event.keyCode == 27) {
            event.preventDefault()
            sendKeyEvent('Back')
        }
        if (event.keyCode == 13) {
            event.preventDefault()
            sendKeyEvent('Confirm')
        }

    });
}
*/

/*


// Change the volume when the slider changes 
$("#volume").bind("slide", function(event, ui) {
    console.log(ui.value)
    $.ajax({
        url: 'http://' + config_ip + ':1925/1/audio/volume',
        data: JSON.stringify({
            "muted": false,
            "current": ui.value
        }),
        dataType: 'json',
        type: 'POST',
    })
});
*/