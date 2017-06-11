WeatherApp.service('Geolocation', ["$q", "localStorageService", "CONST", function($q, localStorageService, CONST) {
    var self = this;
	this.inProgress = false;
	
	this.coords = {
		latitude: undefined,
		longitude: undefined
	};
	
	(function storageInit() {
		
		var storedCoords = localStorageService.get('coords') && JSON.parse( localStorageService.get('coords') );
		if (!storedCoords) {
			return;
		}
		if (storedCoords.time + CONST.STORAGE_EXPIRATION_TIME < Date.now()) {
			localStorageService.remove('coords');
		} else {
			self.coords = storedCoords.data;
		}
	})();
	
	
    this.get = function () {
		
		var self = this;
		var deferred = $q.defer();
		
		this.inProgress = true;

		function onSuccess (position) {
			self.coords = position.coords;
			self.inProgress = false;
			
			localStorageService.set('coords', JSON.stringify({
				data: {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				},
				time: Date.now()
			}));

			deferred.resolve(position.coords);
		}
		
		function onError () {
			self.inProgress = false;
			
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