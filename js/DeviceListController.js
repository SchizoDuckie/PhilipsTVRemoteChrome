PhilipsRC.controller('DeviceListController', ["PortScannerService", "$modalInstance", "SettingsService",
    function(PortScannerService, $modalInstance, SettingsService) {
        var self = this;
        this.devices = [];
        this.ready = false;

        PortScannerService.getRangeToScan().then(function(result) {
            console.log("Got range to scan: ", result);
            result.map(function(ip) {
                PortScannerService.scanRange(ip).then(function(results) {
                    self.devices = results;
                    self.ready = true;
                    console.log("Got portscanner results!", results);
                });
            });
        });

        this.select = function(device) {
            SettingsService.set('devices.selected', device);
            $modalInstance.dismiss('selected');
        };

    }
]);