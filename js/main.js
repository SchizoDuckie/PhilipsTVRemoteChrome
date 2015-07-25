PhilipsRC.controller('MainController', ["SettingsService", "dialogs",
    function(SettingsService, dialogs) {

        this.panel = SettingsService.get('main.panel');

        this.showDeviceList = function() {
            dialogs.create('templates/deviceList.html', 'DeviceListController as vm', {}, {
                size: 'xs'
            });
        };

        if (!SettingsService.get('devices.selected')) {
            this.showDeviceList();
        }

    }
]);