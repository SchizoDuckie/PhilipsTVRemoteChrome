PhilipsRC.directive('remoteButton', ["SettingsService", "PhilipsService",
    function(SettingsService, PhilipsService) {
        return {
            restrict: 'E',
            scope: {
                top: '=top',
                left: '=left',
                width: '=width',
                height: '=height',
                action: '=action'
            },
            template: function($node, $iAttrs) {
                var styles = [];
                ['width', 'height', 'top', 'left'].map(function(key) {
                    if ((key in $iAttrs)) {
                        styles.push(key + ': ' + $iAttrs[key] + 'px');
                    }
                });
                return "<button class='btn' style='" + styles.join(';') + "' ng-click='remote.click()'></button>";
            },
            controllerAs: 'remote',
            controller: ["$scope", "PhilipsService",
                function($scope, PhilipsService) {

                    this.click = function() {
                        PhilipsService.sendKey($scope.action);
                    };
                }
            ]
        };
    }
]);