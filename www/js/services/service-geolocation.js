WeatherApp.service('Geolocation', ["$q", function($q) {
    
	this.coords = {
		latitude: undefined,
		longitude: undefined
	};
	
    this.get = function () {
		
		var self = this;
		var deferred = $q.defer();

		function onSuccess (position) {
			self.coords = position.coords;
			deferred.resolve(position.coords);
		}
		
		function onError () {
			if (self.coords.latitude && self.coords.longitude) {
				deferred.resolve(self.coords);
			} else {
				deferred.reject();
			}
		}
		
		var options = {
			enableHighAccuracy: false,
			timeout: 4000,
			maximumAge:600000
		}
		navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
		
		return deferred.promise;
    }
}]);