/**
 * Wrapper from accessing and requesting chrome permissions
 */
PhilipsRC
/**
 * The Settings Service stores user preferences and provides defaults.
 * Storage is in localStorage. values get serialized on save and deserialized on initialization.
 *
 * Shorthands to the get and set functions are provided in $rootScope by the getSetting and setSetting functions
 */
.factory('SettingsService', [

    function() {
        var service = {
            settings: {},
            defaults: {
                'devices.available': [],
                'devices.selected': false,
                'main.panel': 1
            },
            /**
             * Read a setting key and return either the stored value or the default
             * @param  string key to read
             * @return mixed value value of the setting
             */
            get: function(key) {
                return ((key in service.settings) ? service.settings[key] : (key in service.defaults) ? service.defaults[key] : false);
            },
            /**
             * Store a value in the settings object and persist the changes automatically.
             * @param string key key to store
             * @param mixed value to store
             */
            set: function(key, value) {
                service.settings[key] = value;
                service.persist();
            },
            /**
             * Serialize the data and persist it in localStorage
             */
            persist: function() {
                localStorage.setItem('userPreferences', angular.toJson(service.settings, true));
            },
            /**
             * Fetch stored series from sqlite and store them in service.favorites
             */
            restore: function() {
                if (!localStorage.getItem('userPreferences')) {
                    service.settings = service.defaults;
                } else {
                    service.settings = angular.fromJson(localStorage.getItem('userPreferences'));
                }
            },
        };
        service.restore();
        return service;
    }
])

/**
 * rootScope shorthand helper functions.
 */
.run(function($rootScope, SettingsService) {

    $rootScope.getSetting = function(key) {
        return SettingsService.get(key);
    };

    $rootScope.setSetting = function(key, value) {
        return SettingsService.set(key, value);
    };

    $rootScope.enableSetting = function(key) {
        SettingsService.set(key, true);
    };

    $rootScope.disableSetting = function(key) {
        SettingsService.set(key, false);
    };

});