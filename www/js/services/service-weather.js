WeatherApp.service('Weather', ['$q', '$timeout', 'Geolocation', 'Rest', function($q, $timeout, Geolocation, Rest) {
    /* private properties */
	var self = this;
	var timeout;
	
	/* public properties */
	this.dump = {};
	this.lastTime = 0;
	this.city = undefined;
	this.updateEvery = 1/4 * 60 * 1000;
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
		if (doChangeCity) {
			self.cityUpdateInProgress = true;
		}
		Rest.act(params).then(function(data) {
			self.dump = data;
			self.lastTime = Date.now();
			recursiveGetting();
		}, function () {
			recursiveGetting();			
			if (doChangeCity) {
				self.dump = {};
			}
		});
    }
	
	// Getting data by the timeout every 'updateEvery' seconds.
	recursiveGetting = function () {
		self.updateInProgress = false;
		self.cityUpdateInProgress = false;
		var delay = Date.now() >= self.lastTime + self.updateEvery ? 1500 : self.updateEvery;
		timeout = $timeout(function () {
			self.process(self.city);
		}, delay);
	}
	
	/* public methods */
	this.process = function (newCity) {
		
		var doChangeCity = isCityChanged(newCity);
		if (doChangeCity) {
			$timeout.cancel(timeout);
		}
		this.city = newCity;
		this.updateInProgress = true;
		
		init(doChangeCity);
		return true;
	}
	this.process(this.city);
	

}]);