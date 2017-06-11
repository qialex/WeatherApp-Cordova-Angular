WeatherApp.service('Weather', ['$q', '$timeout', 'localStorageService', 'Geolocation', 'Rest', 'CONST', function($q, $timeout, localStorageService, Geolocation, Rest, CONST) {
    /* private properties */
	var self = this;
	var timeout;
	
	/* public properties */
	this.dump = {};
	this.lastTime = 0;
	this.city = undefined;
	this.updateInProgress = false;
	this.cityUpdateInProgress = false;

	
	/* private methods */
	function isCityChanged (newCity){
		return newCity != self.city;
	}
	
	function init (doChangeCity) {
		
		prepareParams().then(function (params) {
			getFromRest(params, doChangeCity);
		}, function () {
			if (doChangeCity) {
				self.dump = {};
				localStorageService.remove('weather');
			}		
			recursiveGetting();
		});
	}
	
	function prepareParams () {
		var deferred = $q.defer();
		
		if (self.city) {
			$timeout(function () {
				deferred.resolve({city: self.city});
			});
		} else {
			Geolocation.get().then(function (coords) {
				deferred.resolve(coords);
			}, function () {
				deferred.reject();
			});
		}
		
		return deferred.promise;
	}
	
    function getFromRest (params, doChangeCity) {
		Rest.act(params).then(function(data) {
			self.dump = data;
			self.lastTime = Date.now();
			
			localStorageService.set('weather', JSON.stringify({data: data, city: params.city, time:Date.now()}));
			
			recursiveGetting();
		}, function () {
			recursiveGetting();			
			if (doChangeCity) {
				self.dump = {};
				localStorageService.remove('weather');
			}
		});
    }
	
	
	(function storageInit() {
		var weather = localStorageService.get('weather') && JSON.parse( localStorageService.get('weather') );
		if (!weather) {
			return;
		}

		if (weather.time + CONST.STORAGE_EXPIRATION_TIME < Date.now()) {
			localStorageService.remove('weather');
		} else {
			self.dump = weather.data;
			self.city = weather.city;
		}
	})();
	
	
	// Getting data by the timeout every 'updateEvery' seconds.
	recursiveGetting = function () {
		self.updateInProgress = false;
		self.cityUpdateInProgress = false;
		var delay = Date.now() >= self.lastTime + CONST.WEATHER_UPDATE_EVERY ? 1500 : CONST.WEATHER_UPDATE_EVERY;
		timeout = $timeout(function () {
			self.process(self.city);
		}, delay);
	}
	

	/* public methods */
	this.process = function (newCity) {
		
		var doChangeCity = isCityChanged(newCity);
		if (doChangeCity) {
			this.cityUpdateInProgress = true;
			$timeout.cancel(timeout);
		}
		this.city = newCity;
		this.updateInProgress = true;
		
		init(doChangeCity);
		return true;
	}
	this.process(this.city);

}]);