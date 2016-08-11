PhilipsRC.factory('PortScannerService', ["$q", "$http",
    function($q, $http) {


        function getLocalIPs() {
            return $q(function(resolve, reject) {
                var ips = ['192.168.192.1'];
                var pc = new webkitRTCPeerConnection({
                    iceServers: [] // Don't specify any stun/turn servers, otherwise you will also find your public IP addresses.

                });
                pc.createDataChannel(''); // Add a media line, this is needed to activate candidate gathering.
                pc.onicecandidate = function(e) { // onicecandidate is triggered whenever a candidate has been found.
                    if (!e.candidate) { // Candidate gathering completed.
                        resolve(ips);
                        return;
                    }
                    var ip = /^candidate:.+ (\S+) \d+ typ/.exec(e.candidate.candidate)[1];
                    if (ips.indexOf(ip) == -1 && (ip.indexOf('192.168.') > -1 || ip.indexOf('172.16.') > -1 || ip.indexOf('10.0.') > -1)) {
                        ips.push(ip);
                    }
                };
                pc.createOffer(function(sdp) {
                    pc.setLocalDescription(sdp);
                }, function onerror() {});
            });
        }



        var service = {
            getRangeToScan: function() {
                return getLocalIPs().then(function(results) {
                    return results;
                });
            },
            scanRange: function(ip) {
                var parts = ip.split('.');
                parts.pop();
                var addresses = [];
                for (var i = 2; i < 255; i++) {
                    addresses.push(parts.join('.') + '.' + i);
                }
                return $q.all(addresses.map(function(address) {
                    return $http.get("http://" + address + ":1925/1/system", {
                        timeout: 1000
                    }).then(function(result) {
                        result.data.address = address;
                        return result.data;
                    }, function(result) {
                        return false;
                    });
                })).then(function(result) {
                    return result.filter(function(value, key) {
                        return value !== false;
                    });
                });
            }
        };

        return service;

    }
]);