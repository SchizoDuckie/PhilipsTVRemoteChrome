PhilipsRC.controller('DeviceListController', ["PortScannerService", "$modalInstance", "SettingsService",
    function(PortScannerService, $modalInstance, SettingsService) {
        var self = this;
        this.devices = [];
        this.ready = false;

        PortScannerService.getRangeToScan().then(function(result) {
            console.log("Got range to scan: ", result);
            return Promise.all(result.map(PortScannerService.scanRange)).then(function(results) {
                console.log("Devices list for all ips", results);
                for(var i=0; i<results.length; i++) {
                    for(var j=0; j<results[i].length; j++)
                    self.devices.push(results[i][j]);
                }
                return self.devices;
            });
        }).then(function() {
            self.ready = true;
            console.log("List: ", self.devices);
        })

        this.select = function(device) {
            SettingsService.set('devices.selected', device);
            $modalInstance.dismiss('selected');
        };

    }
]);