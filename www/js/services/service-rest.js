WeatherApp.service('Rest', ["$http", "$q", "CONST", function($http, $q, CONST) {
    this.inProgress = false;
    
	this.act = function (data) {
		var self = this;
		var deferred = $q.defer();
		
		this.inProgress	= true;
		
		params = data.city ? {q: data.city} : {lat: data.latitude, lon: data.longitude};
		
		$http({
			method: 'GET',
			url: CONST.REST_SERVER_URL,
			params: params,
			headers: {'Content-Type': 'application/json'}
			
		}).then(function successCallback(response) {
		
			self.inProgress	= false;
			deferred.resolve(response.data);
			
		}, function errorCallback (response) {

			self.inProgress	= false;
			deferred.reject(response);
		});
		
		return deferred.promise;
	}
}]);